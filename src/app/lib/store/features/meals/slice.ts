import type { PayloadAction } from '@reduxjs/toolkit'
import { WeeklyMeals } from '@/utils/interfaces/meals'
import { createSlice } from '@reduxjs/toolkit'

export interface MealSlice {
  weeklyMeals: WeeklyMeals | null
}

const initialState: MealSlice = { weeklyMeals: null }

export const mealSlice = createSlice({
  name: 'mealSlice',
  initialState,
  reducers: {
    setWeeklyMeals: (state, action: PayloadAction<WeeklyMeals>) => {
      state.weeklyMeals = action.payload
    },
  },
})

export const { setWeeklyMeals } = mealSlice.actions

export default mealSlice.reducer
