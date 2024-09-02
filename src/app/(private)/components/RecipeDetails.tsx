import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Ingredient, Instruction, Recipe } from '@/utils/interfaces/recipes'
import { useDispatch, useSelector } from 'react-redux'

import { PiXBold } from 'react-icons/pi'
import { RootState } from '@/app/lib/store/store'
import { isNil } from 'lodash'
import { setDisplayRecipeDetailsModal } from '@/app/lib/store/features/interactions/slice'
import { setRecipe } from '@/app/lib/store/features/recipes/slice'
import { useEffect } from 'react'

export const RecipeDetailsModal = () => {
  const dispatch = useDispatch()
  const { displayRecipeDetailsModal } = useSelector(
    (state: RootState) => state.interactions
  )
  const { recipe, selectedRecipe } = useSelector(
    (state: RootState) => state.recipes
  )

  const modalOnClose = () => {
    dispatch(setDisplayRecipeDetailsModal(false))
    dispatch(setRecipe(null))
  }

  useEffect(() => {
    if (!isNil(selectedRecipe)) {
      ;(async function getRecipeDetails() {
        // TODO: Change recipe for recipes one legacy is gone
        const recipeResponse = await fetch(`/api/recipe/v2`, {
          method: 'POST',
          body: JSON.stringify({
            name: selectedRecipe.label,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
        const { recipe } = (await recipeResponse.json()) as {
          recipe: Recipe
        }

        dispatch(setRecipe(recipe))
      })()
    }
  }, [])

  // TODO: add skeleton
  if (isNil(recipe)) {
    return <></>
  }

  return (
    <Dialog
      className="relative z-10"
      open={displayRecipeDetailsModal}
      onClose={modalOnClose}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-blue-950 bg-opacity-20"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center md:items-center">
          <DialogPanel
            transition
            className="relative w-full transform overflow-hidden rounded-lg bg-white text-left lg:w-1/2"
          >
            <div className="bg-blue-100 px-4 py-8">
              <DialogTitle className="mt-4 text-left text-2xl font-bold leading-6 md:text-3xl">
                <div className="flex items-center justify-between">
                  <p>{recipe.name}</p>
                  <button onClick={modalOnClose}>
                    <PiXBold className="h-8 w-8 rounded-full border-2 border-blue-950 p-1" />
                  </button>
                </div>
              </DialogTitle>

              <p className="mt-4 text-left text-slate-700">
                {recipe.description}
              </p>

              <div className="mt-8">
                <Stats cookTime={recipe.cookTime} prepTime={recipe.prepTime} />
              </div>
            </div>

            <div className="mt-8 px-4 pb-8">
              <Ingredients ingredients={recipe.ingredients} />

              <div className="mt-12">
                <Instructions instructions={recipe.instructions} />
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

const Stats = ({
  cookTime,
  prepTime,
}: {
  cookTime: number
  prepTime: number
}) => {
  return (
    <div>
      <div className="flex items-center justify-between text-center">
        <Stat label="servings" value="2" />
        <Stat label="preparation" value={`${prepTime} mn`} />
        <Stat label="cook" value={`${cookTime} mn`} />
      </div>
    </div>
  )
}

const Stat = ({ value, label }: { value: string; label: string }) => {
  return (
    <div>
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-xs font-light uppercase text-slate-700">{label}</p>
    </div>
  )
}

const Ingredients = ({ ingredients }: { ingredients: Ingredient[] }) => {
  return (
    <div>
      <p className="text-left text-xl font-bold">Ingredients</p>

      <div className="mt-4 space-y-4">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center justify-start gap-x-2">
              <p className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-2xl">
                {ingredient.icon}
              </p>
              <p className="capitalize">{ingredient.name}</p>
            </div>

            <div className="flex items-center justify-end gap-x-2">
              <p>{ingredient.quantity}</p>
              <p>{ingredient.unit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Instructions = ({ instructions }: { instructions: Instruction[] }) => {
  return (
    <div>
      <p className="text-left text-xl font-bold">Instructions</p>

      <div className="mt-4 space-y-4">
        {instructions.map(({ stepNumber, instruction }) => (
          <div key={stepNumber}>
            <p className="border-b border-blue-900 text-lg font-medium text-blue-900">
              Step {stepNumber}
            </p>

            <p className="mt-4">{instruction}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
