import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface OptionsSlice {
  favoriteIngredients: string[]
  excludedIngredients: string[]
  selectedDays: string[]
  selectedMeals: string[]
}

export type Options = OptionsSlice

const initialState: OptionsSlice = {
  favoriteIngredients: [],
  excludedIngredients: [],
  selectedDays: [],
  selectedMeals: [],
}

export const optionsSlice = createSlice({
  name: 'optionsSlice',
  initialState,
  reducers: {
    resetOptions: (state) => {
      state.favoriteIngredients = []
      state.excludedIngredients = []
      state.selectedDays = []
      state.selectedMeals = []
    },
    setFavoriteIngredients: (state, action: PayloadAction<string[]>) => {
      state.favoriteIngredients = action.payload
    },
    setExcludedIngredients: (state, action: PayloadAction<string[]>) => {
      state.excludedIngredients = action.payload
    },
    setSelectedDays: (state, action: PayloadAction<string[]>) => {
      state.selectedDays = action.payload
    },
    setSelectedMeals: (state, action: PayloadAction<string[]>) => {
      state.selectedMeals = action.payload
    },
  },
})

export const {
  resetOptions,
  setFavoriteIngredients,
  setExcludedIngredients,
  setSelectedDays,
  setSelectedMeals,
} = optionsSlice.actions

export default optionsSlice.reducer
