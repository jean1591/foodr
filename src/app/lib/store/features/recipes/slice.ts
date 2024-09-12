import { Recipe, RecipeItem, WeeklyRecipes } from '@/utils/interfaces/recipes'

import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface RecipesSlice {
  latestRecipes: RecipeItem[] | null
  recipe: Recipe | null
  recipes: WeeklyRecipes | null
  selectedRecipe: RecipeItem | null
  todayRecipes: RecipeItem[] | null
}

const initialState: RecipesSlice = {
  latestRecipes: null,
  recipe: null,
  recipes: null,
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
    setRecipes: (state, action: PayloadAction<WeeklyRecipes | null>) => {
      state.recipes = action.payload
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
  setRecipes,
  setSelectedRecipe,
  setTodayRecipes,
} = recipesSlice.actions

export default recipesSlice.reducer
