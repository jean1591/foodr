'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { PiArrowsClockwise } from 'react-icons/pi'
import { RootState } from '@/app/lib/store/store'
import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'
import { isNil } from 'lodash'
import { resetOptions } from '@/app/lib/store/features/options/slice'
import { setDisplayConfirmOrBuyModal } from '@/app/lib/store/features/interactions/slice'

export const OptionButtons = () => {
  const [displayNotEnoughCredits, setDisplayNotEnoughCredits] =
    useState<boolean>(false)
  const [creditsCost, setCreditsCost] = useState<number>(0)
  const [isGenerateDisabled, setIsGenerateDisabled] = useState<boolean>(true)

  const dispatch = useDispatch()

  const options = useSelector((state: RootState) => state.options)
  const { selectedDays, selectedMeals } = options
  const { isRecipesLoading } = useSelector(
    (state: RootState) => state.interactions
  )
  const { user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (selectedMeals.length === 0 || selectedDays.length === 0) {
      setIsGenerateDisabled(true)
    } else {
      setIsGenerateDisabled(false)
    }

    if (!isNil(user)) {
      if (selectedMeals.length * selectedDays.length > user.credits) {
        setDisplayNotEnoughCredits(true)
      } else {
        setDisplayNotEnoughCredits(false)
      }
    }

    setCreditsCost(selectedMeals.length * selectedDays.length)
  }, [selectedDays, selectedMeals])

  return (
    <div>
      <div className="grid grid-cols-4 gap-x-4">
        <button
          onClick={() => dispatch(resetOptions())}
          className={classNames(
            buttonHoverTransition,
            'col-span-1 rounded-xl border-2 border-slate-950 py-4 text-center font-bold uppercase hover:bg-blue-100 hover:shadow-xl'
          )}
        >
          Reset
        </button>

        <button
          disabled={isGenerateDisabled}
          onClick={() => dispatch(setDisplayConfirmOrBuyModal(true))}
          className={classNames(
            buttonHoverTransition,
            'col-span-3 flex items-center justify-center gap-x-4 rounded-xl border-2 border-blue-950 bg-blue-950 py-4 text-center font-bold uppercase text-white hover:opacity-90 hover:shadow-xl disabled:border-opacity-20 disabled:bg-opacity-20 disabled:hover:shadow-none'
          )}
        >
          {isRecipesLoading && (
            <PiArrowsClockwise className="h-6 w-6 animate-spin" />
          )}
          <p>Generate meal plan</p>
          <p className="text-xs">(Cost: {creditsCost} credits)</p>
        </button>
      </div>

      {displayNotEnoughCredits && (
        <p className="mt-2 text-sm text-red-900">
          You don't have enough credits to generate this meal plan. Either add
          credits to your account or select fewer meals/days.
        </p>
      )}
    </div>
  )
}
