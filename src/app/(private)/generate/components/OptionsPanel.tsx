'use client'

import { days, ingredients, meals } from './../options'
import {
  setExcludedIngredients,
  setFavoriteIngredients,
  setSelectedDays,
  setSelectedMeals,
} from '@/app/lib/store/features/options/slice'

import { OptionSelector } from './OptionSelector'
import { RootState } from '@/app/lib/store/store'
import { useSelector } from 'react-redux'

export const OptionsPanel = () => {
  const {
    favoriteIngredients,
    excludedIngredients,
    selectedDays,
    selectedMeals,
  } = useSelector((state: RootState) => state.options)

  return (
    <div className="space-y-8">
      <OptionSelector
        options={meals}
        selectedOptions={selectedMeals}
        setSlice={setSelectedMeals}
        title="Meals"
      />
      <OptionSelector
        options={days}
        selectedOptions={selectedDays}
        setSlice={setSelectedDays}
        title="Days"
      />
      <OptionSelector
        options={ingredients}
        selectedOptions={excludedIngredients}
        setSlice={setExcludedIngredients}
        title="Ingredients you don't like"
      />
      <OptionSelector
        options={ingredients}
        selectedOptions={favoriteIngredients}
        setSlice={setFavoriteIngredients}
        title="Ingredients you love"
      />
    </div>
  )
}
