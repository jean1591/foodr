import type { PayloadAction } from '@reduxjs/toolkit'
import { WeeklyMeals } from '@/utils/interfaces/meals'
import { createSlice } from '@reduxjs/toolkit'

export interface MealSlice {
  breakfastSelected: boolean
  healthySelected: boolean
  veggiesSelected: boolean
  weeklyMeals: WeeklyMeals | null
}

const initialState: MealSlice = {
  breakfastSelected: false,
  healthySelected: false,
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
    setHealthySelected: (state) => {
      state.healthySelected = !state.healthySelected
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
  setHealthySelected,
  setVeggiesSelected,
  setWeeklyMeals,
} = mealSlice.actions

export default mealSlice.reducer
