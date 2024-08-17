import type { PayloadAction } from '@reduxjs/toolkit'
import { WeeklyMeals } from '@/utils/interfaces/meals'
import { createSlice } from '@reduxjs/toolkit'

export interface MealSlice {
  breakfastSelected: boolean
  loadingWeeklyMeals: boolean
  veggiesSelected: boolean
  weeklyMeals: WeeklyMeals | null
}

const initialState: MealSlice = {
  breakfastSelected: false,
  loadingWeeklyMeals: false,
  veggiesSelected: false,
  weeklyMeals: null,
}

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
    setVeggiesSelected: (state) => {
      state.veggiesSelected = !state.veggiesSelected
    },
    setWeeklyMeals: (state, action: PayloadAction<WeeklyMeals>) => {
      state.weeklyMeals = action.payload
    },
  },
})

export const {
  setBreakfastSelected,
  setLoadingWeeklyMeals,
  setVeggiesSelected,
  setWeeklyMeals,
} = mealSlice.actions

export default mealSlice.reducer
