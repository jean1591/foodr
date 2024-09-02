import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface OptionsSlice {
  selectedDays: string[]
  selectedMeals: string[]
}

export type Options = OptionsSlice

const initialState: OptionsSlice = {
  selectedDays: [],
  selectedMeals: [],
}

export const optionsSlice = createSlice({
  name: 'optionsSlice',
  initialState,
  reducers: {
    setSelectedDays: (state, action: PayloadAction<string[]>) => {
      state.selectedDays = action.payload
    },
    setSelectedMeals: (state, action: PayloadAction<string[]>) => {
      state.selectedMeals = action.payload
    },
  },
})

export const { setSelectedDays, setSelectedMeals } = optionsSlice.actions

export default optionsSlice.reducer
