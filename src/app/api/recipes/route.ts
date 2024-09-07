import { NextRequest, NextResponse } from 'next/server'
import { WeeklyRecipes, days } from '@/utils/interfaces/recipes'
import {
  completionRecipes,
  completionRecipesMondayToSunday,
} from '@/utils/mocks/openai/recipes'

import { DbRecipe } from '../interfaces/recipes'
import OpenAI from 'openai'
import { Options } from '@/app/lib/store/features/options/slice'
import { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'
import { getOpenAiData } from '../utils/getOpenAiData'
import { openAiResponseToJsonFormatter } from '../utils/openAiResponseFormater'
import { redirect } from 'next/navigation'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// TODO: do not send ingredients icons
// TODO: get from DB at user login (if any)
// TODO: deduct credits from user
export async function POST(request: NextRequest): Promise<NextResponse> {
  const { options }: { options: Options } = await request.json()

  const supabase = createClient()
  const { id: userId } = await getLoggedInUser(supabase)

  const prompt = generatePrompt(options)
  console.info(prompt)

  const completion = await getOpenAiData(
    completionRecipesMondayToSunday,
    openai,
    prompt
  )

  const recipes = openAiResponseToJsonFormatter<WeeklyRecipes>(
    completion.choices[0].message.content ?? '{}'
  )
  console.info(recipes)

  const dbRecipes = formatRecipesToDbRecipes(recipes, userId)
  await insertDbRecipesInDb({ recipes: dbRecipes, supabase, userId })

  return NextResponse.json({ recipes })
}

const generatePrompt = (options: Options) => {
  return `
      Generate a JSON object of meal ideas in the following format: {"monday": [{"calories": number,"icon": string,"name": string, "cookTime": number,"prepTime": number,"type": string,"description": string}],"tuesday": [...], ...}
  
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

const getLoggedInUser = async (
  supabase: SupabaseClient
): Promise<{ id: string }> => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session || !session.user) {
    throw new Error('User is not connected')
  }

  const { user: authUser } = session

  const { data: users } = await supabase
    .from('users')
    .select('id')
    .eq('auth_user_id', authUser.id)

  if (!users || users.length === 0) {
    console.error('User is not connected')
    redirect('/login')
  }

  return users[0]
}

const formatRecipesToDbRecipes = (
  weeklyRecipes: WeeklyRecipes,
  userId: string
): DbRecipe[] => {
  return days.reduce((acc, current) => {
    const dailyRecipes = weeklyRecipes[current]

    if (dailyRecipes) {
      dailyRecipes.forEach((recipe) => {
        acc.push({
          calories: recipe.calories,
          cook_time: recipe.cookTime,
          day_of_the_week: current,
          description: recipe.description,
          icon: recipe.icon,
          name: recipe.name,
          prep_time: recipe.prepTime,
          type: recipe.type,
          user_id: userId,
        } as DbRecipe)
      })
    }

    return acc
  }, [] as DbRecipe[])
}

const insertDbRecipesInDb = async ({
  recipes,
  supabase,
  userId,
}: {
  recipes: DbRecipe[]
  supabase: SupabaseClient
  userId: string
}) => {
  const { error: recipesDeletionError } = await supabase
    .from('recipes')
    .delete()
    .eq('user_id', userId)

  if (recipesDeletionError) {
    console.error('An error occured while deleting existing recipes', {
      error: JSON.stringify(recipesDeletionError, null, 2),
    })
  }

  const { error: recipesInsertError } = await supabase
    .from('recipes')
    .insert(recipes)

  if (recipesInsertError) {
    console.error('An error occured while inserting recipes', {
      error: JSON.stringify(recipesInsertError, null, 2),
    })
  }
}
