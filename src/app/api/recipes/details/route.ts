import { NextRequest, NextResponse } from 'next/server'
import { Recipe, RecipeItem } from '@/utils/interfaces/recipes'

import OpenAI from 'openai'
import { Options } from '@/app/lib/store/features/options/slice'
import { completionRecipe } from '@/utils/mocks/openai/recipe'
import { getOpenAiData } from '../../utils/getOpenAiData'
import { openAiResponseToJsonFormatter } from '../../utils/openAiResponseFormater'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// TODO: save in DB
// TODO: fetch from DB
export async function POST(request: NextRequest): Promise<NextResponse> {
  const {
    options,
    selectedRecipe,
  }: { options: Options; selectedRecipe: RecipeItem } = await request.json()

  const prompt = generatePrompt(options, selectedRecipe)
  console.info(prompt)

  const completion = await getOpenAiData(completionRecipe, openai, prompt)
  console.info(JSON.stringify(completion, null, 2))

  const recipe = openAiResponseToJsonFormatter<Recipe>(
    completion.choices[0].message.content ?? '{}'
  )
  console.info(recipe)

  return NextResponse.json({ recipe })
}

const generatePrompt = (options: Options, selectedRecipe: RecipeItem) => {
  return `Generate a JSON object for a recipe with the following structure: { "label": string, "cookTime": number, "description": string, "ingredients": [ {"icon": string,"name": string,"quantity": number,"unit": string}],"instructions": [{"instruction": string,"stepNumber": number}],"name": string,"prepTime": number }

  Details:
  - Recipe name: ${selectedRecipe.label}
  - Total preparation time: ${selectedRecipe.totalTime} minutes (split between prepTime and cookTime)
  - Times must be in minutes
  - ${options.excludedIngredients.length > 0 ? `Exclude these ingredients: ${options.excludedIngredients.join(', ')}` : 'No ingredients to exclude.'}
  - Use grams, liters and minutes.
  `
}
