import { NextRequest, NextResponse } from 'next/server'

import OpenAI from 'openai'
import { Options } from '@/app/lib/store/features/options/slice'
import { WeeklyRecipes } from '@/utils/interfaces/recipes'
import { completionRecipes } from '@/utils/mocks/openai/recipes'
import { isNil } from 'lodash'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { options }: { options: Options } = await request.json()

  const prompt = generatePrompt(options)
  console.info(prompt)

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
  const completion = completionRecipes

  const recipes = openAiResponseToJsonFormatter(
    completion.choices[0].message.content ?? '{}'
  )
  console.info(recipes)

  await sleep(2000)

  return NextResponse.json({ recipes })
}

const generatePrompt = (options: Options) => {
  return `
    Generate a JSON object of meal ideas in the following format: {"monday": [{"calories": number,"icon": string,"label": string,"totalTime": number,"type": string}],"tuesday": [...], ...}

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

const openAiResponseToJsonFormatter = (content: string): WeeklyRecipes => {
  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/)

  const response: WeeklyRecipes | null = jsonMatch
    ? JSON.parse(jsonMatch[1])
    : null

  if (response) {
    return response
  }

  const formattedContent: WeeklyRecipes = JSON.parse(content)
  if (!isNil(formattedContent)) {
    return formattedContent
  }

  console.error(content)
  throw new Error('An error occured during openAI response formatting')
}
