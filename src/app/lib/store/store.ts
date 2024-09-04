import { configureStore } from '@reduxjs/toolkit'
import interactionsReducer from './features/interactions/slice'
import optionsReducer from './features/options/slice'
import recipesReducer from './features/recipes/slice'
import userReducer from './features/user/slice'

export const store = configureStore({
  reducer: {
    interactions: interactionsReducer,
    options: optionsReducer,
    recipes: recipesReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
