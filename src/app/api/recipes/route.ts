import { NextRequest, NextResponse } from 'next/server'

import OpenAI from 'openai'
import { Options } from '@/app/lib/store/features/options/slice'
import { WeeklyRecipes } from '@/utils/interfaces/recipes'
import { completionRecipes } from '@/utils/mocks/openai/recipes'
import { getOpenAiData } from '../utils/getOpenAiData'
import { openAiResponseToJsonFormatter } from '../utils/openAiResponseFormater'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// TODO: save in DB
// TODO: get from DB at user login (if any)
// TODO: deduct credits from user
export async function POST(request: NextRequest): Promise<NextResponse> {
  const { options }: { options: Options } = await request.json()

  const prompt = generatePrompt(options)
  console.info(prompt)

  const completion = await getOpenAiData(completionRecipes, openai, prompt)
  console.info(JSON.stringify(completion, null, 2))

  const recipes = openAiResponseToJsonFormatter<WeeklyRecipes>(
    completion.choices[0].message.content ?? '{}'
  )
  console.info(recipes)

  return NextResponse.json({ recipes })
}

const generatePrompt = (options: Options) => {
  return `
      Generate a JSON object of meal ideas in the following format: {"monday": [{"calories": number,"icon": string,"name": string,"totalTime": number,"type": string}],"tuesday": [...], ...}
  
  Details:
  - Only use these days: ${options.selectedDays.length > 0 ? options.selectedDays.join(', ') : 'from monday to sunday'}
  - For each day, generate ideas for these meals: ${options.selectedMeals.length > 0 ? options.selectedMeals.join(', ') : 'breakfast, lunch and dinner'}
  - ${options.favoriteIngredients.length > 0 ? `Ideally include some of these ingredients, but ensure variety by not repeating any ingredient excessively: ${options.favoriteIngredients.join(', ')}` : 'No favorites ingredients.'}
  - ${options.excludedIngredients.length > 0 ? `Exclude meals with these ingredients: ${options.excludedIngredients.join(', ')}` : 'No excluded ingredients.'}
  - Keep meal types to breakfast, lunch, or dinner based on the selected days and meals.
  - Use grams, liters and minutes.
  - Make sure the recipe is varied and respects the provided ingredient constraints.
  `
}
