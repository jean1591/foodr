'use client'

import {
  setBreakfastSelected,
  setLoadingWeeklyMeals,
  setVeggiesSelected,
  setWeeklyMeals,
} from '@/app/lib/store/features/meals/slice'
import { useDispatch, useSelector } from 'react-redux'

import { ButtonParameter } from './ButtonParameter'
import { RootState } from '@/app/lib/store/store'
import { WeeklyMeals } from '@/utils/interfaces/meals'
import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'

export const WeekPlanner = () => {
  const dispatch = useDispatch()
  const { veggiesSelected, breakfastSelected } = useSelector(
    (state: RootState) => state.meals
  )

  const handleGenerateWeeklyMeals = () => {
    dispatch(setLoadingWeeklyMeals(true))
    ;(async function getWeeklyMeals() {
      const weeklyMealsResponse = await fetch('/api/meals', {
        method: 'POST',
        body: JSON.stringify({
          filters: { veggiesSelected, breakfastSelected },
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const { weeklyMeals } = (await weeklyMealsResponse.json()) as {
        weeklyMeals: WeeklyMeals
      }

      dispatch(setWeeklyMeals(weeklyMeals))
      dispatch(setLoadingWeeklyMeals(false))
    })()
  }

  return (
    <div className="rounded-lg bg-green-200 px-4 py-8 shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Create a weekly meal plan</p>
        <button
          onClick={handleGenerateWeeklyMeals}
          className={classNames(
            buttonHoverTransition,
            'rounded-lg bg-white px-8 py-2 font-bold shadow-lg hover:opacity-75 hover:shadow-none'
          )}
        >
          Generate meal plan
        </button>
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
