import { useDispatch, useSelector } from 'react-redux'

import { Ingredients } from './recipeDetails/Ingredients'
import { Instructions } from './recipeDetails/Instructions'
import { PiArrowCircleLeft } from 'react-icons/pi'
import { PiChefHatBold } from 'react-icons/pi'
import { Recipe } from '@/utils/interfaces/recipes'
import { RootState } from '@/app/lib/store/store'
import { Stats } from './recipeDetails/Stats'
import { setDisplayRecipeDetails } from '@/app/lib/store/features/interactions/slice'
import { setRecipe } from '@/app/lib/store/features/recipes/slice'
import { useEffect } from 'react'

export const RecipeDetails = () => {
  const dispatch = useDispatch()
  const options = useSelector((state: RootState) => state.options)
  const { recipe, selectedRecipe } = useSelector(
    (state: RootState) => state.recipes
  )

  useEffect(() => {
    ;(async function getRecipeDetails() {
      const recipeResponse = await fetch('/api/recipes/details', {
        method: 'POST',
        body: JSON.stringify({
          options,
          selectedRecipe,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      const { recipe } = (await recipeResponse.json()) as { recipe: Recipe }

      dispatch(setRecipe(recipe))
    })()
  }, [])

  const handleOnReturn = () => {
    dispatch(setDisplayRecipeDetails(false))
    dispatch(setRecipe(null))
  }

  if (!recipe) {
    return (
      <div className="flex animate-bounce flex-col items-center justify-center">
        <PiChefHatBold className="h-20 w-20" />
        <p className="text-2xl font-bold">Searching</p>
      </div>
    )
  }

  const { cookTime, description, ingredients, instructions, name, prepTime } =
    recipe

  return (
    <div>
      <div className="relative">
        <p className="text-center text-2xl font-bold">{name}</p>
        <button onClick={handleOnReturn} className="absolute -translate-y-full">
          <PiArrowCircleLeft className="h-8 w-8" />
        </button>
      </div>
      <p className="mt-8 text-center">{description}</p>

      <div className="mt-8">
        <Stats prepTime={prepTime} cookTime={cookTime} />
      </div>

      <div className="mt-16">
        <Ingredients ingredients={ingredients} />
      </div>

      <div className="mt-16">
        <Instructions instructions={instructions} />
      </div>
    </div>
  )
}
