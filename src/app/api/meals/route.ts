import { Colours, WeeklyMeals } from '@/utils/interfaces/meals'
import { NextRequest, NextResponse } from 'next/server'

import OpenAI from 'openai'
import { Options } from '@/app/lib/store/features/mealOptions/slice'
import { completionWithBreakfast } from '@/utils/mocks/openai/weeklyMeals'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const regex = /(?:bg-|text-)?([a-z]+)-\d{3}/

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { options }: { options: Options } = await request.json()

  const prompt = generatePrompt(options)

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

const generatePrompt = (options: Options): string => {
  const selectedMeals = `${options.breakfastSelected ? 'breakfast, ' : ''}${options.lunchSelected ? 'lunch, ' : ''}${options.dinnerSelected ? 'dinner, ' : ''}`
  const dietaryPreferences = `${options.nutFreeSelected ? 'nut-free, ' : ''}${options.dairyFreeSelected ? 'dairy-free, ' : ''}${options.highProteinSelected ? 'high-protein, ' : ''}${options.lowCarbSelected ? 'low-carb, ' : ''}${options.lowFatSelected ? 'low-fat, ' : ''}${options.pescatarianSelected ? 'pescatarian, ' : ''}${options.veganSelected ? 'vegan, ' : ''}${options.vegetarianSelected ? 'vegetarian, ' : ''}`
  const cuisinePreferences = `${options.asianSelected ? 'Asian, ' : ''}${options.frenchSelected ? 'French, ' : ''}${options.italianSelected ? 'Italian, ' : ''}${options.mexicanSelected ? 'Mexican, ' : ''}${options.spicySelected ? 'spicy, ' : ''}`
  const preparationPreferences = `${options.mealPrepSelected ? 'meal prep, ' : ''}${options.onePotSelected ? 'one-pot, ' : ''}${options.quickAndEasySelected ? 'quick and easy, ' : ''}`

  const mealSelection = `Generate meal ideas for a weekly meal plan that includes the following:
  - Meals: ${selectedMeals ? selectedMeals.slice(0, -2) : 'no specific meals'}
  - Dietary Preferences: ${dietaryPreferences ? dietaryPreferences.slice(0, -2) : 'no specific dietary preferences'}
  - Cuisines: ${cuisinePreferences ? cuisinePreferences.slice(0, -2) : 'no specific cuisines'}
  - Preparation Preferences: ${preparationPreferences ? preparationPreferences.slice(0, -2) : 'no specific preparation preferences'}
  Ensure the meal plan is balanced and uses a variety of ingredients.`

  const responseStructure =
    'Generate a JSON meal plan for the week using this structure: {monday: {lunch: {name: string, calories: number, icon: string, color: tailwind color}}}.'

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
