import { Recipe, RecipeItem, WeeklyRecipes } from '@/utils/interfaces/recipes'

import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialRecipes: WeeklyRecipes = {
  monday: [
    {
      calories: 450,
      icon: '🍲',
      label: 'Chicken Stir-fry with Vegetables',
      totalTime: 30,
      type: 'dinner',
    },
    {
      calories: 300,
      icon: '🥗',
      label: 'Caesar Salad',
      totalTime: 15,
      type: 'lunch',
    },
  ],
  tuesday: [
    {
      calories: 400,
      icon: '🍛',
      label: 'Beef and Broccoli Stir-fry',
      totalTime: 25,
      type: 'dinner',
    },
    {
      calories: 350,
      icon: '🥪',
      label: 'Turkey Sandwich',
      totalTime: 10,
      type: 'lunch',
    },
  ],
  wednesday: [
    {
      calories: 500,
      icon: '🍝',
      label: 'Spaghetti Bolognese',
      totalTime: 40,
      type: 'dinner',
    },
    {
      calories: 250,
      icon: '🍜',
      label: 'Vegetable Soup',
      totalTime: 20,
      type: 'lunch',
    },
  ],
  thursday: [
    {
      calories: 430,
      icon: '🍛',
      label: 'Chicken Curry with Rice',
      totalTime: 35,
      type: 'dinner',
    },
    {
      calories: 300,
      icon: '🥙',
      label: 'Greek Salad',
      totalTime: 15,
      type: 'lunch',
    },
  ],
  friday: [
    {
      calories: 450,
      icon: '🌮',
      label: 'Fish Tacos',
      totalTime: 30,
      type: 'dinner',
    },
    {
      calories: 350,
      icon: '🥪',
      label: 'BLT Sandwich',
      totalTime: 15,
      type: 'lunch',
    },
  ],
  saturday: [
    {
      calories: 550,
      icon: '🍕',
      label: 'Homemade Pizza',
      totalTime: 60,
      type: 'dinner',
    },
    {
      calories: 200,
      icon: '🍳',
      label: 'Scrambled Eggs with Toast',
      totalTime: 10,
      type: 'lunch',
    },
  ],
  sunday: [
    {
      calories: 500,
      icon: '🍖',
      label: 'Roast Chicken with Vegetables',
      totalTime: 90,
      type: 'dinner',
    },
    {
      calories: 300,
      icon: '🥗',
      label: 'Quinoa Salad',
      totalTime: 20,
      type: 'lunch',
    },
  ],
}

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
  recipes: initialRecipes,
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
  setSelectedRecipe,
  setTodayRecipes,
} = recipesSlice.actions

export default recipesSlice.reducer
