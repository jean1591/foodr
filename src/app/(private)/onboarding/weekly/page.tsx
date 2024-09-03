'use client'

import {
  setExcludedIngredients,
  setFavoriteIngredients,
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
const ingredients = [
  '🥑 Avocado',
  '🥓 Bacon',
  '🥩 Beef',
  '🥦 Broccoli',
  '🧈 Butter',
  '🥬 Cabbage',
  '🥕 Carrot',
  '🧀 Cheese',
  '🍗 Chicken',
  '🥥 Coconut',
  '🌽 Corn',
  '🦀 Crab',
  '🥒 Cucumber',
  '🍳 Egg',
  '🍆 Eggplant',
  '🧄 Garlic',
  '🍯 Honey',
  '🍋 Lemon',
  '🦞 Lobster',
  '🍈 Melon',
  '🥛 Milk',
  '🍄 Mushroom',
  '🧅 Onion',
  '🦪 Oyster',
  '🍝 Pasta',
  '🥜 Peanuts',
  '🥔 Potato',
  '🍚 Rice',
  '🍤 Shrimp',
  '🍠 Sweet Potato',
  '🍅 Tomato',
]

type OptionsMapper = Record<
  number,
  {
    options: string[]
    handler: (options: string[]) => UnknownAction
    selected: string[]
    title: string
    withSearch: boolean
  }
>

export default function OnboardingWeekly() {
  const { displayOptionSelectorModal } = useSelector(
    (state: RootState) => state.interactions
  )
  const {
    favoriteIngredients,
    excludedIngredients,
    selectedDays,
    selectedMeals,
  } = useSelector((state: RootState) => state.options)
  const [step, setStep] = useState<number>(0)

  const optionsMapper: OptionsMapper = {
    0: {
      options: meals,
      handler: setSelectedMeals,
      selected: selectedMeals,
      title: 'meals',
      withSearch: false,
    },
    1: {
      options: days,
      handler: setSelectedDays,
      selected: selectedDays,
      title: 'days',
      withSearch: false,
    },
    2: {
      options: ingredients,
      handler: setExcludedIngredients,
      selected: excludedIngredients,
      title: "Ingredients you don't like",
      withSearch: true,
    },
    3: {
      options: ingredients,
      handler: setFavoriteIngredients,
      selected: favoriteIngredients,
      title: 'Ingredients you love',
      withSearch: true,
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
        {step === 2 && (
          <OptionSelector
            title="Ingredients you don't like"
            optionSelected={excludedIngredients}
          />
        )}
        {step === 3 && (
          <OptionSelector
            title="Ingredients you love"
            optionSelected={favoriteIngredients}
          />
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

      {displayOptionSelectorModal && (
        <OptionSelectorModal params={optionsMapper[step]} />
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
      <p className="mt-2 text-sm">{optionSelected.length} selected</p>

      <div
        onClick={() => dispatch(setDisplayOptionSelectorModal(true))}
        className="mt-4 flex min-h-16 flex-wrap items-center justify-start gap-2 rounded-lg border-2 border-slate-400 px-4 py-2"
      >
        {optionSelected.map((option) => (
          <p
            className="rounded-lg border-2 border-blue-500 bg-blue-50 px-2 py-1 text-sm font-medium text-blue-800"
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

const ExcludedIngredients = () => {
  return <div></div>
}
