'use client'

import {
  setLoadingWeeklyMeals,
  setWeeklyMeals,
} from '@/app/lib/store/features/meals/slice'
import { useDispatch, useSelector } from 'react-redux'

import { NoCreditsModal } from './NoCreditsModal'
import { RootState } from '@/app/lib/store/store'
import { WeeklyMeals } from '@/utils/interfaces/meals'
import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'
import { setDisplayNoCreditsModal } from '@/app/lib/store/features/interactions/slice'
import { setUser } from '@/app/lib/store/features/user/slice'

export const GenerateMealPlanButton = () => {
  const dispatch = useDispatch()
  const { loadingWeeklyMeals, veggiesSelected, breakfastSelected } =
    useSelector((state: RootState) => state.meals)
  const { user } = useSelector((state: RootState) => state.user)
  const { displayNoCreditsModal } = useSelector(
    (state: RootState) => state.interactions
  )

  // TODO: add skeleton
  if (!user) {
    return <></>
  }

  const handleGenerateWeeklyMeals = () => {
    if (user.credits > 0) {
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
        dispatch(setUser({ ...user, credits: user.credits - 1 }))
      })()
    } else {
      dispatch(setDisplayNoCreditsModal(true))
    }
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

      {displayNoCreditsModal && <NoCreditsModal />}
    </div>
  )
}
