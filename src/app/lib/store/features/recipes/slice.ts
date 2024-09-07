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
const initialRecipe: Recipe = {
  cookTime: 20,
  description:
    'A light and flavorful Herbed Chicken Breast with Asparagus, perfect for a low-fat meal. This dish is packed with fresh herbs and is low in calories.',
  ingredients: [
    {
      icon: '🍗',
      name: 'Boneless skinless chicken breast',
      quantity: 2,
      unit: 'pieces',
    },
    { icon: '🌿', name: 'Fresh parsley', quantity: 2, unit: 'tablespoons' },
    { icon: '🌿', name: 'Fresh basil', quantity: 2, unit: 'tablespoons' },
    { icon: '🌿', name: 'Dried thyme', quantity: 1, unit: 'teaspoon' },
    { icon: '🧄', name: 'Garlic (minced)', quantity: 3, unit: 'cloves' },
    { icon: '🍋', name: 'Lemon juice', quantity: 2, unit: 'tablespoons' },
    { icon: '🧂', name: 'Salt', quantity: 1, unit: 'teaspoon' },
    { icon: '🧂', name: 'Black pepper', quantity: 1, unit: 'teaspoon' },
    { icon: '🥦', name: 'Fresh asparagus', quantity: 300, unit: 'grams' },
    { icon: '🧈', name: 'Olive oil (optional)', quantity: 1, unit: 'teaspoon' },
  ],
  instructions: [
    {
      instruction:
        'Preheat the oven to 200 degrees Celsius (390 degrees Fahrenheit).',
      stepNumber: 1,
    },
    {
      instruction:
        'In a bowl, mix the parsley, basil, thyme, garlic, lemon juice, salt, and pepper to create an herb mixture.',
      stepNumber: 2,
    },
    {
      instruction:
        'Rub the chicken breasts with the herb mixture evenly on both sides.',
      stepNumber: 3,
    },
    {
      instruction:
        'Place the seasoned chicken breasts on a baking tray lined with parchment paper.',
      stepNumber: 4,
    },
    {
      instruction:
        'Trim the asparagus ends and arrange them around the chicken on the baking tray.',
      stepNumber: 5,
    },
    {
      instruction:
        'Drizzle a little olive oil over the asparagus (optional) and sprinkle with salt and pepper.',
      stepNumber: 6,
    },
    {
      instruction:
        'Bake in the preheated oven for about 20 minutes, or until the chicken reaches an internal temperature of 75 degrees Celsius (165 degrees Fahrenheit) and is no longer pink in the center.',
      stepNumber: 7,
    },
    {
      instruction:
        'Remove from the oven and let the chicken rest for 5 minutes before slicing.',
      stepNumber: 8,
    },
    {
      instruction:
        'Serve the chicken breast with the roasted asparagus on the side.',
      stepNumber: 9,
    },
  ],
  name: 'Club Sandwich',
  prepTime: 10,
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
  setRecipes,
  setSelectedRecipe,
  setTodayRecipes,
} = recipesSlice.actions

export default recipesSlice.reducer
