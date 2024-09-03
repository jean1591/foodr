'use client'

import { useDispatch, useSelector } from 'react-redux'

import { LatestAndTodayRecipesSkeleton } from './skeletons/LatestAndTodayRecipes'
import { RecipeItem } from './RecipeItems'
import { RecipeItem as RecipeItemType } from '@/utils/interfaces/recipes'
import { RootState } from '@/app/lib/store/store'
import { setLatestRecipes } from '@/app/lib/store/features/recipes/slice'
import { useEffect } from 'react'

export const LatestRecipes = () => {
  const dispatch = useDispatch()
  const { latestRecipes } = useSelector((state: RootState) => state.recipes)

  useEffect(() => {
    ;(async function getWeeklyMeals() {
      // TODO: Change recipe for recipes one legacy is gone
      const recipesResponse = await fetch(`/api/recipe/v2/latest`)
      const { recipes } = (await recipesResponse.json()) as {
        recipes: RecipeItemType[]
      }

      dispatch(setLatestRecipes(recipes))
    })()
  }, [])

  if (!latestRecipes) {
    return <LatestAndTodayRecipesSkeleton title="Latest recipes" />
  }

  return (
    <div className="px-4">
      <p className="text-xl font-bold">Latest recipes</p>

      <div className="mt-4 space-y-4">
        {latestRecipes.map((recipe) => (
          <RecipeItem key={recipe.label} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
