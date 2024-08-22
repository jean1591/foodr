import { configureStore } from '@reduxjs/toolkit'
import interactionsReducer from './features/interactions/slice'
import mealOptionsReducer from './features/mealOptions/slice'
import mealsReducer from './features/meals/slice'
import userReducer from './features/user/slice'

export const store = configureStore({
  reducer: {
    interactions: interactionsReducer,
    mealOptions: mealOptionsReducer,
    meals: mealsReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
