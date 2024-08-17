'use client'

import { Meals, WeeklyMeals } from '@/utils/interfaces/meals'
import { useDispatch, useSelector } from 'react-redux'

import { DishItem } from './DishItem'
import { RootState } from '@/app/lib/store/store'
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

  // TODO: add skeleton
  if (!weeklyMeals) {
    return <></>
  }
  return (
    <div>
      {Object.entries(weeklyMeals).map(([keyDay, day]) => (
        <div key={keyDay} className="my-16 grid grid-cols-3 gap-8">
          {Object.entries(day).map(([keyMeal, meal]) => (
            <DishItem key={keyMeal} type={keyMeal as Meals} meal={meal} />
          ))}
        </div>
      ))}
    </div>
  )
}
