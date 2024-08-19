'use client'

import { DishItem } from './DishItem'
import { DishesSkeleton } from './skeleton/Dishes'
import { MealType } from '@/utils/interfaces/meals'
import { RootState } from '@/app/lib/store/store'
import { classNames } from '@/utils/classNames'
import { useSelector } from 'react-redux'

export const Dishes = () => {
  const { loadingWeeklyMeals, weeklyMeals } = useSelector(
    (state: RootState) => state.meals
  )

  if (loadingWeeklyMeals) {
    return <DishesSkeleton />
  }

  if (!weeklyMeals) {
    return <></>
  }

  const breakfastIncluded = !!weeklyMeals.monday.breakfast

  return (
    <div className="mt-20">
      {Object.entries(weeklyMeals).map(([keyDay, day]) => (
        <div key={keyDay}>
          <p className="text-xl font-bold capitalize">{keyDay}</p>
          <div
            className={classNames(
              breakfastIncluded ? 'grid-cols-3' : 'grid-cols-2',
              'mb-16 mt-4 grid gap-8'
            )}
          >
            {Object.entries(day).map(([keyMeal, meal]) => (
              <DishItem key={keyMeal} type={keyMeal as MealType} meal={meal} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
