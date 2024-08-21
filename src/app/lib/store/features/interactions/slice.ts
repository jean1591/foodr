import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface InteractionsSlice {
  displayNoCreditsModal: boolean
}

const initialState: InteractionsSlice = { displayNoCreditsModal: false }

export const interactionsSlice = createSlice({
  name: 'interactionsSlice',
  initialState,
  reducers: {
    setDisplayNoCreditsModal: (state, action: PayloadAction<boolean>) => {
      state.displayNoCreditsModal = action.payload
    },
  },
})

export const { setDisplayNoCreditsModal } = interactionsSlice.actions

export default interactionsSlice.reducer
