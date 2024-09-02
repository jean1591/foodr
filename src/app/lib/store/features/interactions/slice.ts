import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface InteractionsSlice {
  displayNoCreditsModal: boolean
  displayOptionSelectorModal: boolean
  displayRecipeDetailsModal: boolean
  displayRecipeDetailsModalLegacy: boolean
}

const initialState: InteractionsSlice = {
  displayNoCreditsModal: false,
  displayOptionSelectorModal: false,
  displayRecipeDetailsModal: false,
  displayRecipeDetailsModalLegacy: false,
}

export const interactionsSlice = createSlice({
  name: 'interactionsSlice',
  initialState,
  reducers: {
    setDisplayNoCreditsModal: (state, action: PayloadAction<boolean>) => {
      state.displayNoCreditsModal = action.payload
    },
    setDisplayOptionSelectorModal: (state, action: PayloadAction<boolean>) => {
      state.displayOptionSelectorModal = action.payload
    },
    setDisplayRecipeDetailsModal: (state, action: PayloadAction<boolean>) => {
      state.displayRecipeDetailsModal = action.payload
    },
    setDisplayRecipeDetailsModalLegacy: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.displayRecipeDetailsModalLegacy = action.payload
    },
  },
})

export const {
  setDisplayNoCreditsModal,
  setDisplayOptionSelectorModal,
  setDisplayRecipeDetailsModal,
  setDisplayRecipeDetailsModalLegacy,
} = interactionsSlice.actions

export default interactionsSlice.reducer
