import { Recipe, RecipeItem } from '@/utils/interfaces/recipes'

import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface RecipesSlice {
  latestRecipes: RecipeItem[] | null
  recipe: Recipe | null
  selectedRecipe: RecipeItem | null
  todayRecipes: RecipeItem[] | null
}

const initialState: RecipesSlice = {
  latestRecipes: null,
  recipe: null,
  selectedRecipe: null,
  todayRecipes: null,
}

export const recipesSlice = createSlice({
  name: 'recipesSlice',
  initialState,
  reducers: {
    setLatestRecipes: (state, action: PayloadAction<RecipeItem[] | null>) => {
      state.latestRecipes = action.payload
    },
    setRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.recipe = action.payload
    },
    setSelectedRecipe: (state, action: PayloadAction<RecipeItem | null>) => {
      state.selectedRecipe = action.payload
    },
    setTodayRecipes: (state, action: PayloadAction<RecipeItem[] | null>) => {
      state.todayRecipes = action.payload
    },
  },
})

export const {
  setLatestRecipes,
  setRecipe,
  setSelectedRecipe,
  setTodayRecipes,
} = recipesSlice.actions

export default recipesSlice.reducer
