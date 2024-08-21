import { Colours, WeeklyMeals } from '@/utils/interfaces/meals'
import { NextRequest, NextResponse } from 'next/server'

import OpenAI from 'openai'
import { completionWithBreakfast } from '@/utils/mocks/openai/weeklyMeals'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

interface Filters {
  breakfastSelected: boolean
  veggiesSelected: boolean
}

const regex = /(?:bg-|text-)?([a-z]+)-\d{3}/

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { filters }: { filters: Filters } = await request.json()

  const prompt = generatePrompt(filters)

  /* const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: prompt,
      },
    ],
  }) */
  const completion = completionWithBreakfast

  const weeklyMeals = openAiResponseToJsonFormatter(
    completion.choices[0].message.content ?? '{}'
  )

  await decrementUserCredits()

  await sleep(500)

  return NextResponse.json({ weeklyMeals })
}

const openAiResponseToJsonFormatter = (content: string) => {
  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/)

  const response: WeeklyMeals | null = jsonMatch
    ? JSON.parse(jsonMatch[1])
    : null

  if (!response) {
    return null
  }

  Object.values(response).forEach((day) =>
    Object.values(day).forEach((meal) => {
      const matches = meal.color.match(regex)

      if (matches && matches.length >= 1) {
        meal.color = matches[1] as Colours
      }
    })
  )

  return response
}

const generatePrompt = (filters: Filters): string => {
  const responseStructure =
    'Generate a JSON meal plan for the week using this structure: {monday: {lunch: {name: string, calories: number, icon: string, color: tailwind color}}}.'

  const mealSelection = `Include${filters.breakfastSelected ? ' breakfast,' : ''} lunch and dinner for each day,${filters.veggiesSelected ? ' only veggie meals,' : ''} with some dishes lasting up to 3 meals.`

  const technicalDetails =
    'Only return the JSON, with color as a Tailwind base color'

  return [responseStructure, mealSelection, technicalDetails].join(' ')
}

const decrementUserCredits = async () => {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session || !session.user) {
    throw new Error('User is not connected')
  }

  const { user: authUser } = session

  const { data: users } = await supabase
    .from('users')
    .select('credits')
    .eq('auth_user_id', authUser.id)

  if (!users || users.length === 0) {
    redirect('/login')
  }

  const { error: updateUserCreditError } = await supabase
    .from('users')
    .update({ credits: users[0].credits - 1 })
    .eq('auth_user_id', authUser.id)

  if (updateUserCreditError) {
    console.error('An error occured while updating user credits', {
      error: JSON.stringify(updateUserCreditError, null, 2),
    })
  }
}
