import type { PayloadAction } from '@reduxjs/toolkit'
import { WeeklyMeals } from '@/utils/interfaces/meals'
import { createSlice } from '@reduxjs/toolkit'

export interface MealSlice {
  loadingWeeklyMeals: boolean
  weeklyMeals: WeeklyMeals | null
}

const initialState: MealSlice = {
  loadingWeeklyMeals: false,
  weeklyMeals: null,
}

export const mealSlice = createSlice({
  name: 'mealSlice',
  initialState,
  reducers: {
    setLoadingWeeklyMeals: (state, action: PayloadAction<boolean>) => {
      state.loadingWeeklyMeals = action.payload
    },

    setWeeklyMeals: (state, action: PayloadAction<WeeklyMeals>) => {
      state.weeklyMeals = action.payload
    },
  },
})

export const { setLoadingWeeklyMeals, setWeeklyMeals } = mealSlice.actions

export default mealSlice.reducer
