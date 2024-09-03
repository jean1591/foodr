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
    handler: (options: string[]) => UnknownAction
    selected: string[]
    title: string
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
    0: {
      options: meals,
      handler: setSelectedMeals,
      selected: selectedMeals,
      title: 'meals',
    },
    1: {
      options: days,
      handler: setSelectedDays,
      selected: selectedDays,
      title: 'days',
    },
  }

  return (
    <div className="mx-auto md:max-w-2xl">
      <Header />

      <div className="mt-8 px-4">
        {step === 0 && (
          <OptionSelector title="Meals" optionSelected={selectedMeals} />
        )}
        {step === 1 && (
          <OptionSelector title="Days" optionSelected={selectedDays} />
        )}

        <div className="mt-4 flex items-center justify-end gap-x-4">
          {step > 0 && (
            <button
              className="rounded-lg border-2 border-blue-950 bg-white px-4 py-2 font-bold"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}

          <button
            className="rounded-lg border-2 border-blue-950 bg-blue-950 px-4 py-2 font-bold text-white"
            onClick={() => setStep(step + 1)}
          >
            Continue
          </button>
        </div>
      </div>

      {/* TODO: directly pass optionsMapper[step] instead of destructuring */}
      {displayOptionSelectorModal && (
        <OptionSelectorModal
          options={optionsMapper[step].options}
          selected={optionsMapper[step].selected}
          onCloseHandler={optionsMapper[step].handler}
          title={optionsMapper[step].title}
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

const OptionSelector = ({
  optionSelected,
  title,
}: {
  optionSelected: string[]
  title: string
}) => {
  const dispatch = useDispatch()

  return (
    <div>
      <p className="text-2xl font-bold">{title}</p>

      <div
        onClick={() => dispatch(setDisplayOptionSelectorModal(true))}
        className="mt-4 flex min-h-16 flex-wrap items-center justify-start gap-2 rounded-lg border-2 border-slate-400 px-4 py-2"
      >
        {optionSelected.map((option) => (
          <p
            className="rounded-lg border-2 border-blue-400 bg-blue-50 px-2 py-1 text-sm text-blue-700"
            key={option}
          >
            {option}
          </p>
        ))}
      </div>
    </div>
  )
}

// TODO: continuer les step
// TODO: voir pourquoi build failed
// OptionPicker

const ingredients: { label: string; icon: string }[] = [
  { label: 'Lemon', icon: '🍋' },
  { label: 'Melon', icon: '🍈' },
  { label: 'Tomato', icon: '🍅' },
  { label: 'Coconut', icon: '🥥' },
  { label: 'Avocado', icon: '🥑' },
  { label: 'Eggplant', icon: '🍆' },
  { label: 'Potato', icon: '🥔' },
  { label: 'Carrot', icon: '🥕' },
  { label: 'Corn', icon: '🌽' },
  { label: 'Cucumber', icon: '🥒' },
  { label: 'Cabbage', icon: '🥬' },
  { label: 'Broccoli', icon: '🥦' },
  { label: 'Garlic', icon: '🧄' },
  { label: 'Onion', icon: '🧅' },
  { label: 'Mushroom', icon: '🍄' },
  { label: 'Peanuts', icon: '🥜' },
  { label: 'Cheese', icon: '🧀' },
  { label: 'Chicken', icon: '🍗' },
  { label: 'Bacon', icon: '🥓' },
  { label: 'Beef', icon: '🥩' },
  { label: 'Egg', icon: '🍳' },
  { label: 'Pasta', icon: '🍝' },
  { label: 'Sweet Potato', icon: '🍠' },
  { label: 'Shrimp', icon: '🍤' },
  { label: 'Rice', icon: '🍚' },
  { label: 'Crab', icon: '🦀' },
  { label: 'Lobster', icon: '🦞' },
  { label: 'Oyster', icon: '🦪' },
  { label: 'Butter', icon: '🧈' },
  { label: 'Honey', icon: '🍯' },
  { label: 'Milk', icon: '🥛' },
]

const ExcludedIngredients = () => {
  return <div></div>
}
