import { Meal, MealType, WeeklyMeals } from '@/utils/interfaces/meals'

import type { PayloadAction } from '@reduxjs/toolkit'
import { Recipe } from '@/utils/interfaces/recipes'
import { createSlice } from '@reduxjs/toolkit'
import { isNil } from 'lodash'

// TODO: move loeading to interactions slice
export interface MealSlice {
  generatedRecipes: string[]
  loadingRecipeDetails: boolean
  loadingWeeklyMeals: boolean
  recipeDetails: Recipe | null
  selectedMeal: { meal: Meal; type: MealType } | null
  weeklyMeals: WeeklyMeals | null
}

const initialState: MealSlice = {
  generatedRecipes: [],
  loadingRecipeDetails: false,
  loadingWeeklyMeals: false,
  recipeDetails: null,
  selectedMeal: null,
  weeklyMeals: null,
}

export const mealSlice = createSlice({
  name: 'mealSlice',
  initialState,
  reducers: {
    addToGeneratedRecipes: (state, action: PayloadAction<string>) => {
      const isNotInGeneratedRecipes = isNil(
        state.generatedRecipes.find((recipe) => recipe === action.payload)
      )

      if (isNotInGeneratedRecipes) {
        state.generatedRecipes = [...state.generatedRecipes, action.payload]
      }
    },
    resetGeneratedRecipes: (state) => {
      state.generatedRecipes = []
    },
    setLoadingRecipeDetails: (state, action: PayloadAction<boolean>) => {
      state.loadingRecipeDetails = action.payload
    },
    setLoadingWeeklyMeals: (state, action: PayloadAction<boolean>) => {
      state.loadingWeeklyMeals = action.payload
    },
    setRecipeDetails: (state, action: PayloadAction<Recipe | null>) => {
      state.recipeDetails = action.payload
    },
    setSelectedMeal: (
      state,
      action: PayloadAction<{ meal: Meal; type: MealType } | null>
    ) => {
      state.selectedMeal = action.payload
    },
    setWeeklyMeals: (state, action: PayloadAction<WeeklyMeals>) => {
      state.weeklyMeals = action.payload
    },
  },
})

export const {
  addToGeneratedRecipes,
  resetGeneratedRecipes,
  setLoadingRecipeDetails,
  setLoadingWeeklyMeals,
  setRecipeDetails,
  setSelectedMeal,
  setWeeklyMeals,
} = mealSlice.actions

export default mealSlice.reducer
