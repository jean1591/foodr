'use client'

import { MealType, WeeklyMeals } from '@/utils/interfaces/meals'
import { useDispatch, useSelector } from 'react-redux'

import { DishItem } from './DishItem'
import { DishesSkeleton } from './skeleton/Dishes'
import { RootState } from '@/app/lib/store/store'
import { classNames } from '@/utils/classNames'
import { setWeeklyMeals } from '@/app/lib/store/features/meals/slice'
import { useEffect } from 'react'

export const Dishes = () => {
  const dispatch = useDispatch()
  const { weeklyMeals } = useSelector((state: RootState) => state.meals)

  useEffect(() => {
    ;(async function getWeeklyMeals() {
      const weeklyMealsResponse = await fetch('/api/meals', {
        method: 'POST',
        body: JSON.stringify({ filters: [] }),
        headers: { 'Content-Type': 'application/json' },
      })

      const { weeklyMeals } = (await weeklyMealsResponse.json()) as {
        weeklyMeals: WeeklyMeals
      }

      dispatch(setWeeklyMeals(weeklyMeals))
    })()
  }, [])

  if (!weeklyMeals) {
    return <DishesSkeleton />
  }

  const breakfastIncluded = !!weeklyMeals.monday.breakfast

  return (
    <div>
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
