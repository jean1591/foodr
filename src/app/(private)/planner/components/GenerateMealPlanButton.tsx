'use client'

import {
  setLoadingWeeklyMeals,
  setWeeklyMeals,
} from '@/app/lib/store/features/meals/slice'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/lib/store/store'
import { WeeklyMeals } from '@/utils/interfaces/meals'
import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'
import { setUser } from '@/app/lib/store/features/user/slice'

export const GenerateMealPlanButton = () => {
  const dispatch = useDispatch()
  const { loadingWeeklyMeals, veggiesSelected, breakfastSelected } =
    useSelector((state: RootState) => state.meals)
  const { user } = useSelector((state: RootState) => state.user)

  // TODO: add skeleton
  if (!user) {
    return <></>
  }

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
      dispatch(setUser({ ...user, credit: user.credit - 1 }))
    })()
  }
  return (
    <div>
      <button
        disabled={loadingWeeklyMeals}
        onClick={handleGenerateWeeklyMeals}
        className={classNames(
          buttonHoverTransition,
          'w-full rounded-lg bg-gradient-to-tr from-indigo-400 to-green-300 px-8 py-4 text-lg font-bold text-white shadow-lg hover:opacity-75 hover:shadow-none disabled:from-slate-500 disabled:to-slate-500'
        )}
      >
        Generate meal plan
      </button>
    </div>
  )
}
