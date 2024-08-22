import type { PayloadAction } from '@reduxjs/toolkit'
import { WeeklyMeals } from '@/utils/interfaces/meals'
import { createSlice } from '@reduxjs/toolkit'

export interface MealSlice {
  breakfastSelected: boolean
  loadingWeeklyMeals: boolean
  vegetarianSelected: boolean
  weeklyMeals: WeeklyMeals | null
}

const initialState: MealSlice = {
  breakfastSelected: false,
  loadingWeeklyMeals: false,
  vegetarianSelected: false,
  weeklyMeals: null,
}

// TODO: create meal options slice
export const mealSlice = createSlice({
  name: 'mealSlice',
  initialState,
  reducers: {
    setBreakfastSelected: (state) => {
      state.breakfastSelected = !state.breakfastSelected
    },
    setLoadingWeeklyMeals: (state, action: PayloadAction<boolean>) => {
      state.loadingWeeklyMeals = action.payload
    },
    setVegetarianSelected: (state) => {
      state.vegetarianSelected = !state.vegetarianSelected
    },
    setWeeklyMeals: (state, action: PayloadAction<WeeklyMeals>) => {
      state.weeklyMeals = action.payload
    },
  },
})

export const {
  setBreakfastSelected,
  setLoadingWeeklyMeals,
  setVegetarianSelected,
  setWeeklyMeals,
} = mealSlice.actions

export default mealSlice.reducer
