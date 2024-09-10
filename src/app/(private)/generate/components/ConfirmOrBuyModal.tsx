import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { PiArrowsClockwise, PiXBold } from 'react-icons/pi'
import {
  setDisplayConfirmOrBuyModal,
  setIsrecipesLoading,
} from '@/app/lib/store/features/interactions/slice'
import { useDispatch, useSelector } from 'react-redux'

import { CheckoutButton } from './CheckoutButton'
import { RootState } from '@/app/lib/store/store'
import { WeeklyRecipes } from '@/utils/interfaces/recipes'
import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'
import { setRecipes } from '@/app/lib/store/features/recipes/slice'
import { setUser } from '@/app/lib/store/features/user/slice'

export const ConfirmOrBuyModal = () => {
  const dispatch = useDispatch()

  const { displayConfirmOrBuyModal } = useSelector(
    (state: RootState) => state.interactions
  )
  const options = useSelector((state: RootState) => state.options)
  const { selectedDays, selectedMeals } = options
  const { isRecipesLoading } = useSelector(
    (state: RootState) => state.interactions
  )
  const { user } = useSelector((state: RootState) => state.user)

  const modalOnClose = () => {
    dispatch(setDisplayConfirmOrBuyModal(false))
  }

  const handleGenerateWeeklyRecipes = () => {
    ;(async function getWeeklyRecipes() {
      if (user) {
        dispatch(setIsrecipesLoading(true))
        const recipesResponse = await fetch('/api/recipes/generate', {
          method: 'POST',
          body: JSON.stringify({
            options,
          }),
          headers: { 'Content-Type': 'application/json' },
        })

        const { recipes } = (await recipesResponse.json()) as {
          recipes: WeeklyRecipes
        }

        dispatch(
          setUser({
            ...user,
            credits: user.credits - selectedDays.length * selectedMeals.length,
          })
        )
        dispatch(setRecipes(recipes))
        dispatch(setIsrecipesLoading(false))
        dispatch(setDisplayConfirmOrBuyModal(false))
      }
    })()
  }

  const displayGenerateButton =
    user && user.credits >= selectedDays.length * selectedMeals.length

  return (
    <Dialog
      className="relative z-10"
      open={displayConfirmOrBuyModal}
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
            className="relative w-full transform overflow-hidden rounded-lg bg-white p-4 text-left md:w-2/3 lg:w-1/3"
          >
            <DialogTitle className="text-left text-2xl font-bold leading-6 md:text-3xl">
              <div className="flex items-center justify-between">
                <p>Credits Breakdown</p>
                <button onClick={modalOnClose}>
                  <PiXBold className="h-8 w-8 rounded-full border-2 border-blue-950 p-1" />
                </button>
              </div>
            </DialogTitle>

            <div className="mt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p>(a) Meals per day</p>
                  <p>{selectedMeals.length}</p>
                </div>
                <div className="flex items-center justify-between border-b border-blue-950">
                  <p>(b) Number of days</p>
                  <p>{selectedDays.length}</p>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <p>Generation cost (a x b)</p>
                  <p>{selectedMeals.length * selectedDays.length} credits</p>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <p>Your balance</p>
                  <p>{user?.credits} credits</p>
                </div>
              </div>
            </div>

            {!displayGenerateButton && (
              <p className="mt-4 text-red-900">
                You do not have enough credits to generate this meal plan
              </p>
            )}

            <div className="mt-8 flex items-center justify-end">
              {displayGenerateButton && (
                <button
                  onClick={handleGenerateWeeklyRecipes}
                  className={classNames(
                    buttonHoverTransition,
                    'col-span-3 flex items-center justify-center gap-x-4 rounded-xl border-2 border-blue-950 bg-blue-950 p-4 text-center font-bold uppercase text-white hover:opacity-90 hover:shadow-xl disabled:border-opacity-20 disabled:bg-opacity-20 disabled:hover:shadow-none'
                  )}
                >
                  {isRecipesLoading && (
                    <PiArrowsClockwise className="h-6 w-6 animate-spin" />
                  )}
                  <p>Generate meal plan</p>
                </button>
              )}

              {!displayGenerateButton && <CheckoutButton />}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
