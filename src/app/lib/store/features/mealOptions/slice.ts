import { createSlice } from '@reduxjs/toolkit'

export interface mealOptionsSlice {
  breakfastSelected: boolean
  vegetarianSelected: boolean
}

const initialState: mealOptionsSlice = {
  breakfastSelected: false,
  vegetarianSelected: false,
}

export const mealOptionsSlice = createSlice({
  name: 'mealOptionsSlice',
  initialState,
  reducers: {
    setBreakfastSelected: (state) => {
      state.breakfastSelected = !state.breakfastSelected
    },
    setVegetarianSelected: (state) => {
      state.vegetarianSelected = !state.vegetarianSelected
    },
  },
})

export const { setBreakfastSelected, setVegetarianSelected } =
  mealOptionsSlice.actions

export default mealOptionsSlice.reducer
