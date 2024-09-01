'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { bgGradient, buttonHoverTransition } from '@/utils/design/constants'
import { useDispatch, useSelector } from 'react-redux'

import { BorderGradient } from '@/app/design/BorderGradient'
import { RootState } from '@/app/lib/store/store'
import { classNames } from '@/utils/classNames'
import { setDisplayNoCreditsModal } from '@/app/lib/store/features/interactions/slice'
import { useState } from 'react'

export const NoCreditsModal = () => {
  const dispatch = useDispatch()
  const { displayNoCreditsModal } = useSelector(
    (state: RootState) => state.interactions
  )
  const { user } = useSelector((state: RootState) => state.user)

  const [stepIndex, setStepIndex] = useState<number>(0)

  if (!user) {
    return <></>
  }

  const handleNextStep = () => {
    if (stepIndex === 0) {
      setStepIndex(1)
      ;(async function updateUser() {
        await fetch('/api/users/hasRequestedCredits', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        })
      })()
    }
  }

  return (
    <Dialog
      className="relative z-10"
      open={displayNoCreditsModal}
      onClose={() => dispatch(setDisplayNoCreditsModal(false))}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-slate-700 bg-opacity-75"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="md:w-3/4 md:px-20 lg:w-1/2">
            <BorderGradient>
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white p-8 md:px-20"
              >
                <div className="text-left">
                  <DialogTitle className="text-center text-xl font-bold leading-6 md:text-3xl">
                    <p>Oh no !</p>
                    <p>You don't have enough credits 😢</p>
                  </DialogTitle>

                  {stepIndex === 0 && (
                    <div className="mt-8">
                      <div>
                        <p className="text-center text-xl font-bold leading-6">
                          Credits balance: {user.credits}
                        </p>

                        <p className="mt-4 text-center font-medium">
                          You need credits to generate meal plans and recipes.
                          You can buy more credits with the button below.
                        </p>
                      </div>

                      <div className="mt-8">
                        <p className="text-center text-xl font-bold leading-6">
                          Cost per generation:
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <p>Weekly meal plan</p>
                          <p>10 credits</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p>Recipe</p>
                          <p>1 credits</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {stepIndex === 1 && (
                    <p className="mt-4 text-center font-medium">
                      This functionality is not yet developed. You'll be notify
                      when credits are available to buy.
                    </p>
                  )}

                  <div className="mx-auto mt-12 w-full text-sm text-white">
                    {stepIndex === 0 && (
                      <button
                        onClick={handleNextStep}
                        className={classNames(
                          buttonHoverTransition,
                          bgGradient,
                          'w-full rounded-lg px-8 py-4 text-lg font-bold text-white shadow-lg hover:opacity-75 hover:shadow-none disabled:from-slate-500 disabled:to-slate-500'
                        )}
                      >
                        Buy 100 credits for 0.99€
                      </button>
                    )}

                    {stepIndex === 1 && (
                      <button
                        onClick={() =>
                          dispatch(setDisplayNoCreditsModal(false))
                        }
                        className={classNames(
                          buttonHoverTransition,
                          bgGradient,
                          'w-full rounded-lg px-8 py-4 text-lg font-bold text-white shadow-lg hover:opacity-75 hover:shadow-none disabled:from-slate-500 disabled:to-slate-500'
                        )}
                      >
                        Got it !
                      </button>
                    )}
                  </div>
                </div>
              </DialogPanel>
            </BorderGradient>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
