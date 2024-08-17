import { configureStore } from '@reduxjs/toolkit'
import mealsReducer from './features/meals/slice'
import userReducer from './features/user/slice'

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
