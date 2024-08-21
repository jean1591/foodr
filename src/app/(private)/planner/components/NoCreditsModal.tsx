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

export const NoCreditsModal = () => {
  const dispatch = useDispatch()
  const { displayNoCreditsModal } = useSelector(
    (state: RootState) => state.interactions
  )

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
          <BorderGradient>
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-green-100 p-8 md:px-20"
            >
              <div className="text-left">
                <DialogTitle className="text-center text-xl font-bold leading-6 md:text-3xl">
                  <p>Oh no !</p>
                  <p>You don't have enough credits 😢</p>
                </DialogTitle>

                <p className="mt-4 font-medium">
                  You need credits to generate new meal plans, or wait until
                  tomorrow if you're on a paid plan.
                </p>

                <div className="mx-auto mt-12 w-full text-sm text-white">
                  <button
                    className={classNames(
                      buttonHoverTransition,
                      bgGradient,
                      'w-full rounded-lg px-8 py-4 text-lg font-bold text-white shadow-lg hover:opacity-75 hover:shadow-none disabled:from-slate-500 disabled:to-slate-500'
                    )}
                  >
                    Buy more generations
                  </button>
                </div>
              </div>
            </DialogPanel>
          </BorderGradient>
        </div>
      </div>
    </Dialog>
  )
}
