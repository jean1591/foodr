'use client'

import {
  setBreakfastSelected,
  setVeggiesSelected,
} from '@/app/lib/store/features/meals/slice'
import { useDispatch, useSelector } from 'react-redux'

import { ButtonParameter } from './ButtonParameter'
import { RootState } from '@/app/lib/store/store'

export const Options = () => {
  const dispatch = useDispatch()
  const { veggiesSelected, breakfastSelected } = useSelector(
    (state: RootState) => state.meals
  )

  return (
    <div className="rounded-lg bg-green-100 px-4 py-8 shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium">Options</p>
      </div>

      {/* TODO: Add parameters */}
      <div className="mt-4 flex items-center justify-start gap-4">
        <ButtonParameter
          label="☕️ Add breakfast"
          onClickHandler={() => dispatch(setBreakfastSelected())}
          selected={breakfastSelected}
        />
        <ButtonParameter
          label="🥕 Veggies"
          onClickHandler={() => dispatch(setVeggiesSelected())}
          selected={veggiesSelected}
        />
      </div>
    </div>
  )
}
