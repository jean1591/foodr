'use client'

import {
  bgGradient,
  buttonHoverTransition,
  textGradient,
} from '@/utils/design/constants'

import { Step } from './components/Step'
import { classNames } from '@/utils/classNames'
import useOptionsHook from '../planner/components/hook/useOptionsHook'
import { useState } from 'react'

export default function OnboardingPage() {
  const [stepIndex, setStepIndex] = useState<number>(0)
  const options = useOptionsHook()

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

  return (
    <div className="my-24">
      {/* Onboarding header */}
      <div className="text-center">
        <p className="text-6xl font-extrabold leading-none tracking-tight">
          Welcome to{' '}
          <span className={classNames(textGradient, bgGradient)}>Foodr</span>
        </p>
        <p className="mt-8 text-lg font-medium leading-relaxed">
          Tick some boxes se we can generate a meal plan
          <span
            className={classNames(bgGradient, 'rounded px-2 py-1 text-white')}
          >
            fitted to your needs
          </span>
        </p>
      </div>

      {/* Steps */}
      <div className="mt-16 md:h-60">
        {stepIndex === 0 && (
          <Step
            title="Which meals would you like to generate ?"
            options={options.meals}
          />
        )}
        {stepIndex === 1 && (
          <Step title="Dietary preferences" options={options.dietary} />
        )}
        {stepIndex === 2 && (
          <Step title="Cuisines & Flavors" options={options.cuisine} />
        )}
        {stepIndex === 3 && (
          <Step title="Prepation style" options={options.preparation} />
        )}
      </div>

      {/* Step selector */}
      <div className="mt-8 flex items-center justify-center gap-x-8">
        <button
          onClick={handleStepDecrement}
          className={classNames(
            buttonHoverTransition,
            'w-32 rounded-lg border-2 border-slate-500 py-4 hover:border-slate-300'
          )}
        >
          Back
        </button>

        <button
          onClick={handleStepIndexIncrement}
          className={classNames(
            bgGradient,
            buttonHoverTransition,
            'w-32 rounded-lg py-4 font-medium text-white shadow-lg hover:opacity-75 hover:shadow-none'
          )}
        >
          {stepIndex === 3 ? 'Generate' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
