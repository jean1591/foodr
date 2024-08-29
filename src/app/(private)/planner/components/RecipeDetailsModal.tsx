'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import {
  setLoadingRecipeDetails,
  setRecipeDetails,
} from '@/app/lib/store/features/meals/slice'
import { useDispatch, useSelector } from 'react-redux'

import { Recipe } from './recipeModal/Recipe'
import { Recipe as RecipeDetails } from '@/utils/interfaces/recipes'
import { RootState } from '@/app/lib/store/store'
import { classNames } from '@/utils/classNames'
import { isNil } from 'lodash'
import { setDisplayRecipeDetailsModal } from '@/app/lib/store/features/interactions/slice'
import useColour from './hook/useColour'
import { useEffect } from 'react'

export const RecipeDetailsModal = () => {
  const dispatch = useDispatch()

  const { selectedMeal } = useSelector((state: RootState) => state.meals)
  const { displayRecipeDetailsModal } = useSelector(
    (state: RootState) => state.interactions
  )
  const mealOptions = useSelector((state: RootState) => state.mealOptions)

  const modalOnClose = () => {
    dispatch(setDisplayRecipeDetailsModal(false))
    dispatch(setRecipeDetails(null))
  }

  useEffect(() => {
    if (!isNil(selectedMeal)) {
      dispatch(setLoadingRecipeDetails(true))
      ;(async function getWeeklyMeals() {
        const recipeDetailsResponse = await fetch('/api/recipe', {
          method: 'POST',
          body: JSON.stringify({
            name: selectedMeal.meal.name,
            options: mealOptions,
          }),
          headers: { 'Content-Type': 'application/json' },
        })

        const { recipeDetails } = (await recipeDetailsResponse.json()) as {
          recipeDetails: RecipeDetails
        }

        dispatch(setRecipeDetails(recipeDetails))
        dispatch(setLoadingRecipeDetails(false))
      })()
    }
  }, [])

  if (!selectedMeal) {
    return <>An error occurred</>
  }

  const { meal, type } = selectedMeal
  const { bgColor } = useColour(meal.color)

  return (
    <Dialog
      className="relative z-10"
      open={displayRecipeDetailsModal}
      onClose={modalOnClose}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-slate-700 bg-opacity-75"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center md:items-center">
          <DialogPanel
            transition
            className="relative w-full transform overflow-hidden rounded-lg bg-white p-8 text-left md:w-3/4 md:px-20 lg:w-1/2"
          >
            <div className="flex items-center justify-center">
              <p
                className={classNames(
                  bgColor,
                  'rounded-lg px-4 py-1 text-center font-semibold capitalize'
                )}
              >
                {type}
              </p>
            </div>

            <DialogTitle className="mt-4 text-center text-xl font-bold leading-6 md:text-3xl">
              <p>{meal.name}</p>
            </DialogTitle>

            <div className="mt-4">
              <Recipe />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
