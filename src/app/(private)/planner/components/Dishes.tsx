'use client'

import { DishItem } from './DishItem'
import { DishesSkeleton } from './skeleton/Dishes'
import { MealType } from '@/utils/interfaces/meals'
import { RootState } from '@/app/lib/store/store'
import { useSelector } from 'react-redux'

export const Dishes = () => {
  const { loadingWeeklyMeals, weeklyMeals } = useSelector(
    (state: RootState) => state.meals
  )

  if (loadingWeeklyMeals) {
    return <DishesSkeleton />
  }

  // Add skeleton
  if (!weeklyMeals) {
    return <></>
  }

  return (
    <div className="space-y-12 md:space-y-20">
      {Object.entries(weeklyMeals).map(([keyDay, day]) => (
        <div key={keyDay}>
          <p className="text-xl font-bold capitalize">{keyDay}</p>
          <div className="mt-4 space-y-8">
            {Object.entries(day).map(([keyMeal, meal]) => (
              <DishItem key={keyMeal} type={keyMeal as MealType} meal={meal} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
