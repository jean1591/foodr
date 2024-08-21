import { Colours, WeeklyMeals } from '@/utils/interfaces/meals'
import { NextRequest, NextResponse } from 'next/server'
import {
  completionNoBreakfast,
  completionWithBreakfast,
} from '@/utils/mocks/openai/weeklyMeals'

import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAPI_KEY })

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
