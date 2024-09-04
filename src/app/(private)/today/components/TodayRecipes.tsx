'use client'

import { useDispatch, useSelector } from 'react-redux'

import { LatestAndTodayRecipesSkeleton } from './skeletons/LatestAndTodayRecipes'
import { PiBowlFoodBold } from 'react-icons/pi'
import { RecipeItem } from '../../components/RecipeItems'
import { RecipeItem as RecipeItemType } from '@/utils/interfaces/recipes'
import { RootState } from '@/app/lib/store/store'
import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'
import { setTodayRecipes } from '@/app/lib/store/features/recipes/slice'
import { useEffect } from 'react'

export const TodayRecipes = () => {
  const dispatch = useDispatch()
  const { todayRecipes } = useSelector((state: RootState) => state.recipes)

  useEffect(() => {
    ;(async function getWeeklyMeals() {
      // TODO: Change recipe for recipes one legacy is gone
      const recipesResponse = await fetch(`/api/recipe/v2/today`)
      const { recipes } = (await recipesResponse.json()) as {
        recipes: RecipeItemType[]
      }

      dispatch(setTodayRecipes(recipes))
    })()
  }, [])

  if (!todayRecipes) {
    return <LatestAndTodayRecipesSkeleton title="Today's recipes" />
  }

  return (
    <div className="px-4">
      <p className="text-xl font-bold">Today's recipes</p>

      <div className="mt-4">
        {todayRecipes.length === 0 && (
          <div>
            <p className="text-center">
              No meal plan were found for today, generate a one to get ideas
            </p>

            <button
              className={classNames(
                buttonHoverTransition,
                'flex w-full items-center justify-center space-x-4 rounded-xl bg-white py-4 text-slate-600 shadow-lg hover:shadow-none'
              )}
            >
              <PiBowlFoodBold className="h-4 w-4" />
              <p>Generate a weekly meals plan</p>
            </button>
          </div>
        )}

        {todayRecipes.length > 0 && (
          <div className="space-y-4">
            {todayRecipes.map((recipe) => (
              <RecipeItem key={recipe.label} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
