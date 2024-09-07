import { NextRequest, NextResponse } from 'next/server'
import { RecipeItem, WeekDays, WeeklyRecipes } from '@/utils/interfaces/recipes'

import { DbRecipe } from '../interfaces/recipes'
import { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'
import { getLoggedInUser } from '../utils/user'
import { isNil } from 'lodash'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const supabase = createClient()
  const { id: userId } = await getLoggedInUser(supabase)
  const dbRecipes = await getDbRecipes(supabase, userId)

  if (!isNil(dbRecipes)) {
    const recipes = formatDbRecipesToRecipes(dbRecipes)
    return NextResponse.json({ recipes })
  }

  return NextResponse.json({ recipes: [] })
}

const formatDbRecipesToRecipes = (dbRecipes: DbRecipe[]): WeeklyRecipes => {
  return dbRecipes.reduce((acc, current) => {
    const dayOfTheWeek = current.day_of_the_week as WeekDays

    const recipeItem: RecipeItem = {
      calories: current.calories,
      cookTime: current.cook_time,
      description: current.description,
      icon: current.icon,
      name: current.name,
      prepTime: current.prep_time,
      type: current.type,
    }

    if (acc[dayOfTheWeek]) {
      acc[dayOfTheWeek].push(recipeItem)
    } else {
      acc[dayOfTheWeek] = [recipeItem]
    }

    return acc
  }, {} as WeeklyRecipes)
}

const getDbRecipes = async (
  supabase: SupabaseClient,
  userId: string
): Promise<DbRecipe[] | null> => {
  const { data: recipes } = await supabase
    .from('recipes')
    .select('*')
    .eq('user_id', userId)

  if (isNil(recipes)) {
    return null
  }

  return recipes
}
