'use client'

import {
  setSelectedDays,
  setSelectedMeals,
} from '@/app/lib/store/features/options/slice'
import { useDispatch, useSelector } from 'react-redux'

import { OptionSelectorModal } from '../components/OptionSelectorModal'
import { RootState } from '@/app/lib/store/store'
import { UnknownAction } from '@reduxjs/toolkit'
import { setDisplayOptionSelectorModal } from '@/app/lib/store/features/interactions/slice'
import { useState } from 'react'

const meals = ['breakfast', 'lunch', 'dinner']
const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

type OptionsMapper = Record<
  number,
  {
    options: string[]
    selected: string[]
    handler: (options: string[]) => UnknownAction
  }
>

export default function OnboardingWeekly() {
  const { displayOptionSelectorModal } = useSelector(
    (state: RootState) => state.interactions
  )
  const { selectedDays, selectedMeals } = useSelector(
    (state: RootState) => state.options
  )
  const [step, setStep] = useState<number>(0)

  const optionsMapper: OptionsMapper = {
    0: { options: meals, selected: selectedMeals, handler: setSelectedMeals },
    1: { options: days, selected: selectedDays, handler: setSelectedDays },
  }

  return (
    <div className="mx-auto md:max-w-2xl">
      <Header />

      <div className="mt-8 px-4">
        {step === 0 && <MealSelection />}
        {step === 1 && <DaySelection />}

        <div className="mt-4 flex items-center justify-end gap-x-4">
          <button
            className="rounded-lg bg-blue-950 px-4 py-2 font-bold text-white"
            onClick={() => setStep(step + 1)}
          >
            Continue
          </button>
        </div>
      </div>

      {displayOptionSelectorModal && (
        <OptionSelectorModal
          options={optionsMapper[step].options}
          selected={optionsMapper[step].selected}
          onCloseHandler={optionsMapper[step].handler}
        />
      )}
    </div>
  )
}

const Header = () => {
  return (
    <div className="bg-blue-100 px-4 py-8 text-center">
      <h1 className="text-2xl font-bold">Welcome to Foodr !</h1>

      <div className="mt-4">
        <p className="text-lg">
          Let's customize your experience to make it unique
        </p>
      </div>
    </div>
  )
}

// TODO: mutualiser MealSelection et DaySelection
// TODO: Ajouter bouton back si step > 0
// TODO: continuer les step
const MealSelection = () => {
  const dispatch = useDispatch()
  const { selectedMeals } = useSelector((state: RootState) => state.options)

  return (
    <div>
      <p className="text-2xl font-bold">Meals</p>
      <div
        onClick={() => dispatch(setDisplayOptionSelectorModal(true))}
        className="mt-4 flex min-h-16 flex-wrap items-center justify-start gap-4 rounded-lg border-2 border-slate-400 p-4"
      >
        {selectedMeals.map((option) => (
          <p
            className="rounded-lg border-2 border-blue-400 bg-blue-50 px-2 py-1 text-blue-700"
            key={option}
          >
            {option}
          </p>
        ))}
      </div>
    </div>
  )
}

const DaySelection = () => {
  const dispatch = useDispatch()
  const { selectedDays } = useSelector((state: RootState) => state.options)

  return (
    <div>
      <p className="text-2xl font-bold">Days</p>
      <div
        onClick={() => dispatch(setDisplayOptionSelectorModal(true))}
        className="mt-4 flex min-h-16 flex-wrap items-center justify-start gap-4 rounded-lg border-2 border-slate-400 p-4"
      >
        {selectedDays.map((option) => (
          <p
            className="rounded-lg border-2 border-blue-400 bg-blue-50 px-2 py-1 text-blue-700"
            key={option}
          >
            {option}
          </p>
        ))}
      </div>
    </div>
  )
}
