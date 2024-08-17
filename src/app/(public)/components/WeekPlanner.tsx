'use client'

import {
  setBreakfastSelected,
  setHealthySelected,
  setVeggiesSelected,
} from '@/app/lib/store/features/meals/slice'
import { useDispatch, useSelector } from 'react-redux'

import { ButtonParameter } from './ButtonParameter'
import { RootState } from '@/app/lib/store/store'

export const WeekPlanner = () => {
  const dispatch = useDispatch()
  const { healthySelected, veggiesSelected, breakfastSelected } = useSelector(
    (state: RootState) => state.meals
  )

  return (
    <div className="rounded-lg bg-green-100 px-4 py-8 shadow-lg">
      <p className="text-2xl font-bold">Create a weekly meal plan</p>

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
        <ButtonParameter
          label="🥗 Healthy"
          onClickHandler={() => dispatch(setHealthySelected())}
          selected={healthySelected}
        />
      </div>

      {/* TODO: think about leaving the prompt awailable */}
      <div className="mt-8">
        <p>
          Generate weekly meals{' '}
          <span className="font-medium">
            {breakfastSelected ? 'with' : 'without'} breakfast
          </span>
          , using{' '}
          <span className="font-medium">
            {veggiesSelected ? 'only' : 'not only'}{' '}
          </span>
          vegetables, and{' '}
          <span className="font-medium">
            {healthySelected ? 'with ' : 'without '}{' '}
          </span>
          healthy requirements.
        </p>
      </div>
    </div>
  )
}
