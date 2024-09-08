import { useEffect, useState } from 'react'

import { OptionButtons } from './OptionButtons'
import { OptionsPanel } from '../../generate/components/OptionsPanel'
import { RootState } from '@/app/lib/store/store'
import { classNames } from '@/utils/classNames'
import { useSelector } from 'react-redux'

export const FirstGenerateStep = () => {
  const [isGenerateDisabled, setIsGenerateDisabled] = useState<boolean>(true)
  const [displayErrorMessage, setDisplayErrorMessage] = useState<boolean>(false)
  const { selectedDays, selectedMeals } = useSelector(
    (state: RootState) => state.options
  )

  useEffect(() => {
    if (
      selectedMeals.length * selectedDays.length > 5 ||
      selectedMeals.length === 0 ||
      selectedDays.length === 0
    ) {
      setIsGenerateDisabled(true)
    } else {
      setIsGenerateDisabled(false)
    }

    if (selectedMeals.length * selectedDays.length > 5) {
      setDisplayErrorMessage(true)
    } else {
      setDisplayErrorMessage(false)
    }
  }, [selectedDays, selectedMeals])

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-2xl font-bold">
        Your account have been credited with 5 credits 🎉
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-24">
        <div className="text-lg">
          <p>Let's generate your first meal plan</p>
          <p>
            Select options on the right panel to tailor your meals, use can use
            up to <span className="font-bold">5 credits</span>.
          </p>

          <p className="mt-8">Current meal plan cost:</p>

          <div className="mt-4 w-2/3 space-y-2">
            <div className="flex items-center justify-between">
              <p>(a) Meals per day</p>
              <p>{selectedMeals.length}</p>
            </div>
            <div className="flex items-center justify-between border-b border-blue-950">
              <p>(b) Number of days</p>
              <p>{selectedDays.length}</p>
            </div>
            <div className="flex items-center justify-between font-bold">
              <p>Credits (a x b)</p>
              <p
                className={classNames(
                  isGenerateDisabled ? 'text-red-900' : 'text-blue-950'
                )}
              >
                {selectedMeals.length * selectedDays.length}
              </p>
            </div>
          </div>

          {displayErrorMessage && (
            <p className="text-sm text-red-900">
              It looks like you don't have enough credits, try with a simpler
              meal plan to start
            </p>
          )}
        </div>
        <div>
          <OptionsPanel />
          <div className="mt-8">
            <OptionButtons canGenerate={isGenerateDisabled} />
          </div>
        </div>
      </div>
    </div>
  )
}
