import { NextRequest, NextResponse } from 'next/server'
import { Recipe, RecipeItem } from '@/utils/interfaces/recipes'

import { DbRecipeWithRelations } from '../../interfaces/recipes'
import OpenAI from 'openai'
import { Options } from '@/app/lib/store/features/options/slice'
import { SupabaseClient } from '@supabase/supabase-js'
import { completionRecipe } from '@/utils/mocks/openai/recipe'
import { createClient } from '@/utils/supabase/server'
import { getLoggedInUser } from '../../utils/user'
import { getOpenAiData } from '../../utils/getOpenAiData'
import { isNil } from 'lodash'
import { openAiResponseToJsonFormatter } from '../../utils/openAiResponseFormater'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request: NextRequest): Promise<NextResponse> {
  const {
    options,
    selectedRecipe,
  }: { options: Options; selectedRecipe: RecipeItem } = await request.json()
  const supabase = createClient()
  const { id: userId } = await getLoggedInUser(supabase)
  const dbRecipe = await getDbRecipe(supabase, selectedRecipe.name, userId)

  if (!isNil(dbRecipe)) {
    console.log('Data source is DB')
    const recipe = formatDbRecipeToRecipe(dbRecipe)
    return NextResponse.json({ recipe })
  }

  const prompt = generatePrompt(options, selectedRecipe)
  console.info(prompt)

  const completion = await getOpenAiData(completionRecipe, openai, prompt)

  const recipe = openAiResponseToJsonFormatter<Recipe>(
    completion.choices[0].message.content ?? '{}'
  )
  console.info(recipe)

  await insertRecipeInDb({ recipe, supabase, userId })

  return NextResponse.json({ recipe })
}

const generatePrompt = (options: Options, selectedRecipe: RecipeItem) => {
  return `Generate a JSON object for a recipe with the following structure: { "label": string,"description": string, "ingredients": [ {"icon": string,"name": string,"quantity": number,"unit": string}],"instructions": [{"instruction": string,"stepNumber": number}],"name": string }

  Details:
  - Recipe name: ${selectedRecipe.name}
  - ${options.excludedIngredients.length > 0 ? `Exclude these ingredients: ${options.excludedIngredients.join(', ')}` : 'No ingredients to exclude.'}
  - Use grams, liters and minutes.
  `
}

const getDbRecipe = async (
  supabase: SupabaseClient,
  name: string,
  userId: string
): Promise<DbRecipeWithRelations | null> => {
  const { data: recipes } = await supabase
    .from('recipes')
    .select('*, ingredients (*), instructions (*)')
    .eq('user_id', userId)
    .eq('name', name)

  if (
    isNil(recipes) ||
    recipes.length === 0 ||
    recipes[0].ingredients.length === 0 ||
    recipes[0].instructions.length === 0
  ) {
    return null
  }

  return recipes[0]
}

const insertRecipeInDb = async ({
  recipe,
  supabase,
  userId,
}: {
  recipe: Recipe
  supabase: SupabaseClient
  userId: string
}) => {
  const { data: recipes } = await supabase
    .from('recipes')
    .select('id')
    .eq('name', recipe.name)
    .eq('user_id', userId)

  if (isNil(recipes) || recipes.length === 0) {
    console.error(`No recipes found for ${recipe.name} for user ${userId}`)
    throw new Error(`No recipes found for ${recipe.name} for user ${userId}`)
  }

  const recipeId = recipes[0].id

  const { error: ingredientsDeletionError } = await supabase
    .from('ingredients')
    .delete()
    .eq('recipe_id', recipeId)

  if (ingredientsDeletionError) {
    console.error('An error occured while deleting existing ingredients', {
      error: JSON.stringify(ingredientsDeletionError, null, 2),
    })
  }

  const { error: instructionsDeletionError } = await supabase
    .from('instructions')
    .delete()
    .eq('recipe_id', recipeId)

  if (instructionsDeletionError) {
    console.error('An error occured while deleting existing instructions', {
      error: JSON.stringify(instructionsDeletionError, null, 2),
    })
  }

  const { ingredients, instructions } = recipe

  const { error: ingredientsInsertError } = await supabase
    .from('ingredients')
    .insert(
      ingredients.map((ingredient) => ({
        ...ingredient,
        recipe_id: recipeId,
      }))
    )
  if (ingredientsInsertError) {
    console.error('An error occured while inserting ingredients', {
      error: JSON.stringify(ingredientsInsertError, null, 2),
    })
  }

  const { error: instructionsInsertError } = await supabase
    .from('instructions')
    .insert(
      instructions.map((instruction) => ({
        instruction: instruction.instruction,
        step_number: instruction.stepNumber,
        recipe_id: recipes[0].id,
      }))
    )
  if (instructionsInsertError) {
    console.error('An error occured while inserting instructions', {
      error: JSON.stringify(instructionsInsertError, null, 2),
    })
  }
}

const formatDbRecipeToRecipe = (dbRecipes: DbRecipeWithRelations): Recipe => {
  return {
    cookTime: dbRecipes.cook_time,
    description: dbRecipes.description,
    ingredients: dbRecipes.ingredients,
    instructions: dbRecipes.instructions.map((instruction) => ({
      instruction: instruction.instruction,
      stepNumber: instruction.step_number,
    })),
    name: dbRecipes.name,
    prepTime: dbRecipes.prep_time,
  }
}
