import { Colours, WeeklyMeals, days } from '@/utils/interfaces/meals'
import { NextRequest, NextResponse } from 'next/server'

import { DbMeal } from '../interfaces/meals'
import OpenAI from 'openai'
import { Options } from '@/app/lib/store/features/mealOptions/slice'
import { SupabaseClient } from '@supabase/supabase-js'
import { completionWithBreakfast } from '@/utils/mocks/openai/weeklyMeals'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const colourRegex = /(?:bg-|text-)?([a-z]+)-\d{3}/

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { options }: { options: Options } = await request.json()

  const supabase = createClient()
  const user = await getLoggedInUser(supabase)

  if (user.credits > 9) {
    const prompt = generatePrompt(options)

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: prompt,
        },
      ],
    })
    // const completion = completionWithBreakfast
    console.log(completion.choices[0].message.content)

    const weeklyMeals = openAiResponseToJsonFormatter(
      completion.choices[0].message.content ?? '{}'
    )

    await updateDbUser(supabase, user)
    await updateDbMeals(supabase, weeklyMeals, user.id)

    return NextResponse.json({ weeklyMeals })
  }

  console.error('User requested weekly meals without credits', user)
  throw new Error('User requested weekly meals without credits')
}

const openAiResponseToJsonFormatter = (content: string): WeeklyMeals => {
  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/)

  const response: WeeklyMeals | null = jsonMatch
    ? JSON.parse(jsonMatch[1])
    : null

  if (!response) {
    throw new Error('An error occured during openAI response formatting')
  }

  Object.values(response).forEach((day) =>
    Object.values(day).forEach((meal) => {
      const matches = meal.color.match(colourRegex)

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
  - Meals: ${selectedMeals ? selectedMeals.slice(0, -2) : 'lunch, dinner'}
  - Dietary Preferences: ${dietaryPreferences ? dietaryPreferences.slice(0, -2) : 'no specific dietary preferences'}
  - Cuisines: ${cuisinePreferences ? cuisinePreferences.slice(0, -2) : 'no specific cuisines'}
  - Preparation Preferences: ${preparationPreferences ? preparationPreferences.slice(0, -2) : 'no specific preparation preferences'}
  Ensure the meal plan is balanced and uses a variety of ingredients.`

  const responseStructure =
    'Generate a JSON meal plan for the week using this structure: {monday: {lunch: {name: string, icon: string, color: tailwind color}}}.'

  const technicalDetails =
    'Only return the JSON, with color as a Tailwind base color'

  return [responseStructure, mealSelection, technicalDetails].join(' ')
}

const getLoggedInUser = async (
  supabase: SupabaseClient
): Promise<{ credits: number; generation_count: number; id: string }> => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session || !session.user) {
    throw new Error('User is not connected')
  }

  const { user: authUser } = session

  const { data: users } = await supabase
    .from('users')
    .select('credits, generation_count, id')
    .eq('auth_user_id', authUser.id)

  if (!users || users.length === 0) {
    console.error('User is not connected')
    redirect('/login')
  }

  return users[0]
}

const updateDbUser = async (
  supabase: SupabaseClient,
  user: {
    credits: number
    generation_count: number
    id: string
  }
) => {
  const { credits, generation_count, id: userId } = user

  const { error: updateUserCreditError } = await supabase
    .from('users')
    .update({ credits: credits - 10, generation_count: generation_count + 1 })
    .eq('id', userId)

  if (updateUserCreditError) {
    console.error('An error occured while updating user credits', {
      error: JSON.stringify(updateUserCreditError, null, 2),
    })
  }
}

const formatMealToDb = (weeklyMeals: WeeklyMeals, userId: string): DbMeal[] => {
  return days.reduce((acc, current) => {
    const dailyMeals = weeklyMeals[current]

    Object.entries(dailyMeals).forEach(([key, value]) => {
      acc.push({
        color: value.color,
        day: current,
        day_as_number: 0, // TODO: update this
        icon: value.icon,
        meal: key,
        name: value.name,
        user_id: userId,
      })
    })

    return acc
  }, [] as DbMeal[])
}

const updateDbMeals = async (
  supabase: SupabaseClient,
  weeklyMeals: WeeklyMeals,
  userId: string
) => {
  // Delete previously generated meals
  await supabase.from('meals').delete().eq('user_id', userId)

  // Insert new meals
  const formattedWeeklyMeals = formatMealToDb(weeklyMeals, userId)

  const { error: mealsInsertError } = await supabase
    .from('meals')
    .insert(formattedWeeklyMeals)

  if (mealsInsertError) {
    console.error('An error occured while inserting user meals', {
      error: JSON.stringify(mealsInsertError, null, 2),
    })
  }
}
