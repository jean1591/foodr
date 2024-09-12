import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface InteractionsSlice {
  displayConfirmOrBuyModal: boolean
  displayNoCreditsModal: boolean
  displayOptionSelectorModal: boolean
  displayRecipeDetails: boolean
  displayRecipeDetailsModal: boolean
  displayRecipeDetailsModalLegacy: boolean
  isRecipesLoading: boolean
}

const initialState: InteractionsSlice = {
  displayConfirmOrBuyModal: false,
  displayNoCreditsModal: false,
  displayOptionSelectorModal: false,
  displayRecipeDetails: false,
  displayRecipeDetailsModal: false,
  displayRecipeDetailsModalLegacy: false,
  isRecipesLoading: false,
}

export const interactionsSlice = createSlice({
  name: 'interactionsSlice',
  initialState,
  reducers: {
    setDisplayConfirmOrBuyModal: (state, action: PayloadAction<boolean>) => {
      state.displayConfirmOrBuyModal = action.payload
    },
    setDisplayNoCreditsModal: (state, action: PayloadAction<boolean>) => {
      state.displayNoCreditsModal = action.payload
    },
    setDisplayOptionSelectorModal: (state, action: PayloadAction<boolean>) => {
      state.displayOptionSelectorModal = action.payload
    },
    setDisplayRecipeDetails: (state, action: PayloadAction<boolean>) => {
      state.displayRecipeDetails = action.payload
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
    setIsrecipesLoading: (state, action: PayloadAction<boolean>) => {
      state.isRecipesLoading = action.payload
    },
  },
})

export const {
  setDisplayConfirmOrBuyModal,
  setDisplayNoCreditsModal,
  setDisplayOptionSelectorModal,
  setDisplayRecipeDetails,
  setDisplayRecipeDetailsModal,
  setDisplayRecipeDetailsModalLegacy,
  setIsrecipesLoading,
} = interactionsSlice.actions

export default interactionsSlice.reducer
