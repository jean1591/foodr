import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface InteractionsSlice {
  displayNoCreditsModal: boolean
  displayRecipeDetailsModal: boolean
}

const initialState: InteractionsSlice = {
  displayNoCreditsModal: false,
  displayRecipeDetailsModal: false,
}

export const interactionsSlice = createSlice({
  name: 'interactionsSlice',
  initialState,
  reducers: {
    setDisplayNoCreditsModal: (state, action: PayloadAction<boolean>) => {
      state.displayNoCreditsModal = action.payload
    },
    setDisplayRecipeDetailsModal: (state, action: PayloadAction<boolean>) => {
      state.displayRecipeDetailsModal = action.payload
    },
  },
})

export const { setDisplayNoCreditsModal, setDisplayRecipeDetailsModal } =
  interactionsSlice.actions

export default interactionsSlice.reducer
