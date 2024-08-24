'use client'

import { bgGradient, buttonHoverTransition } from '@/utils/design/constants'
import {
  setLoadingWeeklyMeals,
  setWeeklyMeals,
} from '@/app/lib/store/features/meals/slice'
import { useDispatch, useSelector } from 'react-redux'

import { PiArrowClockwise } from 'react-icons/pi'
import { RootState } from '@/app/lib/store/store'
import { Step } from './Step'
import { WeeklyMeals } from '@/utils/interfaces/meals'
import { classNames } from '@/utils/classNames'
import { setUser } from '@/app/lib/store/features/user/slice'
import useOptionsHook from '../../planner/components/hook/useOptionsHook'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const Steps = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const options = useOptionsHook()

  const [stepIndex, setStepIndex] = useState<number>(0)
  const { user } = useSelector((state: RootState) => state.user)
  const { loadingWeeklyMeals } = useSelector((state: RootState) => state.meals)
  const mealOptions = useSelector((state: RootState) => state.mealOptions)

  if (!user) {
    return <></>
  }

  const handleStepDecrement = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1)
    }
  }

  const handleStepIndexIncrement = () => {
    if (stepIndex < 3) {
      setStepIndex(stepIndex + 1)
    }
  }

  const onGenerate = () => {
    dispatch(setLoadingWeeklyMeals(true))
    ;(async function getWeeklyMeals() {
      await fetch('/api/users/hasCompletedOnboarding', {
        method: 'PUT',
        body: JSON.stringify({
          options: mealOptions,
        }),
      })

      const weeklyMealsResponse = await fetch('/api/meals', {
        method: 'POST',
        body: JSON.stringify({
          options: mealOptions,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const { weeklyMeals } = (await weeklyMealsResponse.json()) as {
        weeklyMeals: WeeklyMeals
      }

      dispatch(
        setUser({
          ...user,
          credits: user.credits - 1,
          hasCompletedOnboarding: true,
        })
      )
      dispatch(setWeeklyMeals(weeklyMeals))
      dispatch(setLoadingWeeklyMeals(false))
      router.push('/planner')
    })()
  }

  return (
    <div>
      <div className="mt-16 md:h-60">
        {stepIndex === 0 && (
          <Step
            title="Which meals would you like to generate ?"
            options={options.meals}
            details="Default: all options selected"
          />
        )}
        {stepIndex === 1 && (
          <Step
            title="Dietary preferences"
            options={options.dietary}
            details="Selecting contradictory options might not generate accurate meal plans"
          />
        )}
        {stepIndex === 2 && (
          <Step
            title="Cuisines & Flavors"
            options={options.cuisine}
            details="Selecting more than one option might not generate accurate meal plans"
          />
        )}
        {stepIndex === 3 && (
          <Step
            title="Prepation style"
            options={options.preparation}
            details="Selecting more than one option might not generate accurate meal plans"
          />
        )}
      </div>

      {/* Step selector */}
      <div className="mt-8 flex items-center justify-center gap-x-8">
        <button
          onClick={handleStepDecrement}
          className={classNames(
            buttonHoverTransition,
            'w-36 rounded-lg border-2 border-slate-500 py-4 hover:border-slate-300'
          )}
        >
          Back
        </button>

        {stepIndex < 3 && (
          <button
            onClick={handleStepIndexIncrement}
            className={classNames(
              bgGradient,
              buttonHoverTransition,
              'w-36 rounded-lg py-4 font-medium text-white shadow-lg hover:opacity-75 hover:shadow-none'
            )}
          >
            Continue
          </button>
        )}

        {stepIndex === 3 && (
          <button
            onClick={onGenerate}
            className={classNames(
              bgGradient,
              buttonHoverTransition,
              'w-36 rounded-lg py-4 font-medium text-white shadow-lg hover:opacity-75 hover:shadow-none'
            )}
          >
            <div className="flex items-center justify-center gap-x-2">
              {loadingWeeklyMeals && (
                <PiArrowClockwise className="h-6 w-6 animate-spin" />
              )}
              <p>Generate</p>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}
