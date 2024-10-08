import { RecipeItem, WeeklyRecipes } from '@/utils/interfaces/recipes'
import {
  setDisplayRecipeDetails,
  setIsrecipesLoading,
} from '@/app/lib/store/features/interactions/slice'
import {
  setRecipes,
  setSelectedRecipe,
} from '@/app/lib/store/features/recipes/slice'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/lib/store/store'
import { useEffect } from 'react'

export const Recipes = () => {
  const dispatch = useDispatch()
  const { recipes } = useSelector((state: RootState) => state.recipes)

  useEffect(() => {
    ;(async function getWeeklyRecipes() {
      dispatch(setIsrecipesLoading(true))
      const recipesResponse = await fetch('/api/recipes', {
        method: 'GET',
      })

      const { recipes } = (await recipesResponse.json()) as {
        recipes: WeeklyRecipes
      }

      dispatch(setRecipes(recipes))
      dispatch(setIsrecipesLoading(false))
    })()
  }, [])

  // TODO: add illustration
  if (!recipes) {
    return <div></div>
  }

  const onRecipeClicked = (recipe: RecipeItem) => {
    dispatch(setDisplayRecipeDetails(true))
    dispatch(setSelectedRecipe(recipe))
  }

  return (
    <div className="space-y-12">
      {Object.entries(recipes).map(([day, recipes]) => (
        <div key={day}>
          <div className="flex items-center justify-center gap-x-4">
            <p className="text-2xl font-bold capitalize">{day}</p>

            <div className="h-[2px] w-full bg-slate-950"></div>
          </div>

          <div className="mt-4 space-y-4">
            {recipes.map((recipe) => (
              <div
                key={recipe.name}
                onClick={() => onRecipeClicked(recipe)}
                className="flex items-center justify-between space-x-4 rounded-lg bg-white pr-2 shadow-lg hover:cursor-pointer"
              >
                <div className="flex items-center justify-start space-x-4">
                  <p className="rounded-r-none rounded-s-lg bg-blue-100 p-4 text-4xl md:text-5xl">
                    {recipe.icon}
                  </p>

                  <div>
                    <p className="text-sm font-semibold capitalize">
                      {recipe.type}
                    </p>
                    <p className="font-bold">{recipe.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
