import type { PayloadAction } from '@reduxjs/toolkit'
import { RecipeItem } from '@/utils/interfaces/recipes'
import { createSlice } from '@reduxjs/toolkit'

export interface RecipesSlice {
  latestRecipes: RecipeItem[] | null
  todayRecipes: RecipeItem[] | null
}

const initialState: RecipesSlice = { latestRecipes: null, todayRecipes: null }

export const recipesSlice = createSlice({
  name: 'recipesSlice',
  initialState,
  reducers: {
    setLatestRecipes: (state, action: PayloadAction<RecipeItem[] | null>) => {
      state.latestRecipes = action.payload
    },
    setTodayRecipes: (state, action: PayloadAction<RecipeItem[] | null>) => {
      state.todayRecipes = action.payload
    },
  },
})

export const { setLatestRecipes, setTodayRecipes } = recipesSlice.actions

export default recipesSlice.reducer
