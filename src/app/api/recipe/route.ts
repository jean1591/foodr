import {
  DbIngredient,
  DbInstruction,
  DbRecipe,
  DbRecipeWithRelations,
} from '../interfaces/recipes'
import { Ingredient, Instruction, Recipe } from '@/utils/interfaces/recipes'
import { NextRequest, NextResponse } from 'next/server'
import {
  completionRecipe,
  completionRecipeFullJson,
} from '@/utils/mocks/openai/recipe'
import { isEmpty, isNil } from 'lodash'

import OpenAI from 'openai'
import { Options } from '@/app/lib/store/features/mealOptions/slice'
import { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { name, options }: { name: string; options: Options } =
    await request.json()

  const supabase = createClient()
  const { credits, id: userId } = await getLoggedInUser(supabase)
  const { id: mealId } = await getMealFromNameAndUserId(supabase, name, userId)
  const existingRecipe = await getRecipeFromNameAndUserId(supabase, mealId)

  if (!isNil(existingRecipe)) {
    return NextResponse.json({ recipeDetails: existingRecipe })
  }

  if (credits > 0) {
    const prompt = generatePrompt(name, options)

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
    // const completion = completionRecipe
    console.log(completion.choices[0].message.content)

    const recipeDetails = openAiResponseToJsonFormatter(
      completion.choices[0].message.content ?? '{}'
    )

    await updateDbUser(supabase, { id: userId, credits })
    await insertRecipeInDb({
      mealId,
      recipe: { ...recipeDetails, name },
      supabase,
    })

    return NextResponse.json({ recipeDetails })
  }

  console.error('User requested recipes without credits', {
    credits,
    id: userId,
  })
  throw new Error('User requested recipes without credits')
}

const openAiResponseToJsonFormatter = (content: string): Recipe => {
  try {
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/)

    const response: Recipe | null = jsonMatch ? JSON.parse(jsonMatch[1]) : null

    if (response) {
      return response
    }

    const formattedContent: Recipe = JSON.parse(content)
    if (!isNil(formattedContent)) {
      return formattedContent
    }

    throw new Error('An error occured during openAI response formatting')
  } catch (error) {
    console.error(error)
    throw new Error('An error occured during openAI response formatting')
  }
}

const generatePrompt = (name: string, options: Options): string => {
  const dietaryPreferences = `${options.nutFreeSelected ? 'nut-free, ' : ''}${options.dairyFreeSelected ? 'dairy-free, ' : ''}${options.highProteinSelected ? 'high-protein, ' : ''}${options.lowCarbSelected ? 'low-carb, ' : ''}${options.lowFatSelected ? 'low-fat, ' : ''}${options.pescatarianSelected ? 'pescatarian, ' : ''}${options.veganSelected ? 'vegan, ' : ''}${options.vegetarianSelected ? 'vegetarian, ' : ''}`

  const mealSelection = `The recipe must respect the following dietary preferences: ${dietaryPreferences ? dietaryPreferences.slice(0, -2) : 'no specific dietary preferences'}`

  const responseStructure = `Generate a recipe for ${name} using a JSON object with the following structure:{"cookTime": number,"description": string,"ingredients": [{"icon": string,"name": string,"quantity": number,"unit": string}],"instructions": [{"instruction": string,"stepNumber": number}],"prepTime": number} Include detailed steps with specific temperatures in Celsius and use metric units for quantities. Provide precise temperatures and times in minutes. Only generate the JSON, no surrounding text.`

  return [responseStructure, mealSelection].join(' ')
}

const getLoggedInUser = async (
  supabase: SupabaseClient
): Promise<{ credits: number; id: string }> => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session || !session.user) {
    throw new Error('User is not connected')
  }

  const { user: authUser } = session

  const { data: users } = await supabase
    .from('users')
    .select('id, credits')
    .eq('auth_user_id', authUser.id)

  if (!users || users.length === 0) {
    console.error('User is not connected')
    redirect('/login')
  }

  return users[0]
}

const getMealFromNameAndUserId = async (
  supabase: SupabaseClient,
  name: string,
  userId: string
): Promise<{ id: string }> => {
  const { data: meals } = await supabase
    .from('meals')
    .select('id')
    .eq('name', name)
    .eq('user_id', userId)

  if (isNil(meals) || isEmpty(meals)) {
    throw new Error(`No meals found with name ${name} and user_id ${userId}`)
  }

  return meals[0]
}

const insertRecipeInDb = async ({
  mealId,
  recipe,
  supabase,
}: {
  mealId: string
  recipe: Recipe
  supabase: SupabaseClient
}) => {
  const { data: recipes, error: recipeInsertError } = await supabase
    .from('recipes')
    .insert(formatRecipeToDb(mealId, recipe))
    .select('id')

  if (recipeInsertError) {
    console.error('An error occured while inserting recipe', {
      error: JSON.stringify(recipeInsertError, null, 2),
    })
  }

  if (isNil(recipes) || isEmpty(recipes)) {
    throw new Error('No recipe found after insertion')
  }

  const recipeId = recipes[0].id

  const { error: ingredientsInsertError } = await supabase
    .from('ingredients')
    .insert(formatIngredientsToDb(recipeId, recipe.ingredients))

  if (ingredientsInsertError) {
    console.error('An error occured while inserting ingredients', {
      error: JSON.stringify(ingredientsInsertError, null, 2),
    })
  }

  const { error: instructionsInsertError } = await supabase
    .from('instructions')
    .insert(formatInstructionsToDb(recipeId, recipe.instructions))

  if (instructionsInsertError) {
    console.error('An error occured while inserting instrutions', {
      error: JSON.stringify(instructionsInsertError, null, 2),
    })
  }
}

const formatRecipeToDb = (mealId: string, recipe: Recipe): DbRecipe => {
  return {
    cook_time: recipe.cookTime,
    description: recipe.description,
    meal_id: mealId,
    name: recipe.name,
    prep_time: recipe.prepTime,
  }
}

const formatIngredientsToDb = (
  recipeId: string,
  ingredients: Ingredient[]
): DbIngredient[] => {
  return ingredients.map((ingredient) => ({
    recipe_id: recipeId,
    ...ingredient,
  }))
}

const formatInstructionsToDb = (
  recipeId: string,
  instructions: Instruction[]
): DbInstruction[] => {
  return instructions.map((instruction) => ({
    recipe_id: recipeId,
    step_number: instruction.stepNumber,
    instruction: instruction.instruction,
  }))
}

const getRecipeFromNameAndUserId = async (
  supabase: SupabaseClient,
  mealId: string
): Promise<Recipe | null> => {
  const { data: recipes } = await supabase
    .from('recipes')
    .select('*, ingredients (*), instructions (*)')
    .eq('meal_id', mealId)

  if (isNil(recipes) || isEmpty(recipes)) {
    return null
  }

  return formatDbRecipeToRecipe(recipes[0])
}

const formatDbRecipeToRecipe = (recipe: DbRecipeWithRelations): Recipe => {
  return {
    cookTime: recipe.cook_time,
    description: recipe.description,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions.map((instruction) => ({
      ...instruction,
      stepNumber: instruction.step_number,
    })),
    name: recipe.name,
    prepTime: recipe.prep_time,
  }
}

const updateDbUser = async (
  supabase: SupabaseClient,
  user: {
    credits: number
    id: string
  }
) => {
  const { credits, id: userId } = user

  const { error: updateUserCreditError } = await supabase
    .from('users')
    .update({ credits: credits - 1 })
    .eq('id', userId)

  if (updateUserCreditError) {
    console.error('An error occured while updating user credits', {
      error: JSON.stringify(updateUserCreditError, null, 2),
    })
  }
}
