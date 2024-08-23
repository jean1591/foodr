import { createSlice } from '@reduxjs/toolkit'

interface MealOptionsSlice {
  // Meals
  breakfastSelected: boolean
  dinnerSelected: boolean
  lunchSelected: boolean
  // Dietary
  nutFreeSelected: boolean
  dairyFreeSelected: boolean
  highProteinSelected: boolean
  lowCarbSelected: boolean
  lowFatSelected: boolean
  pescatarianSelected: boolean
  veganSelected: boolean
  vegetarianSelected: boolean
  // Cuisines
  asianSelected: boolean
  frenchSelected: boolean
  italianSelected: boolean
  mexicanSelected: boolean
  spicySelected: boolean
  // Preparation
  mealPrepSelected: boolean
  onePotSelected: boolean
  quickAndEasySelected: boolean
}

export type Options = MealOptionsSlice

const initialState: MealOptionsSlice = {
  // Meals
  breakfastSelected: false,
  dinnerSelected: false,
  lunchSelected: false,
  // Dietary
  nutFreeSelected: false,
  dairyFreeSelected: false,
  highProteinSelected: false,
  lowCarbSelected: false,
  lowFatSelected: false,
  pescatarianSelected: false,
  veganSelected: false,
  vegetarianSelected: false,
  // Cuisines
  asianSelected: false,
  frenchSelected: false,
  italianSelected: false,
  mexicanSelected: false,
  spicySelected: false,
  // Preparation
  mealPrepSelected: false,
  onePotSelected: false,
  quickAndEasySelected: false,
}

export const mealOptionsSlice = createSlice({
  name: 'mealOptionsSlice',
  initialState,
  reducers: {
    // Meals
    setBreakfastSelected: (state) => {
      state.breakfastSelected = !state.breakfastSelected
    },
    setDinnerSelected: (state) => {
      state.dinnerSelected = !state.dinnerSelected
    },
    setLunchSelected: (state) => {
      state.lunchSelected = !state.lunchSelected
    },
    // Dietary
    setNutFreeSelected: (state) => {
      state.nutFreeSelected = !state.nutFreeSelected
    },
    setDairyFreeSelected: (state) => {
      state.dairyFreeSelected = !state.dairyFreeSelected
    },
    setHighProteinSelected: (state) => {
      state.highProteinSelected = !state.highProteinSelected
    },
    setLowCarbSelected: (state) => {
      state.lowCarbSelected = !state.lowCarbSelected
    },
    setLowFatSelected: (state) => {
      state.lowFatSelected = !state.lowFatSelected
    },
    setPescatarianSelected: (state) => {
      state.pescatarianSelected = !state.pescatarianSelected
    },
    setVeganSelected: (state) => {
      state.veganSelected = !state.veganSelected
    },
    setVegetarianSelected: (state) => {
      state.vegetarianSelected = !state.vegetarianSelected
    },

    // Cuisines
    setAsianSelected: (state) => {
      state.asianSelected = !state.asianSelected
    },
    setFrenchSelected: (state) => {
      state.frenchSelected = !state.frenchSelected
    },
    setItalianSelected: (state) => {
      state.italianSelected = !state.italianSelected
    },
    setMexicanSelected: (state) => {
      state.mexicanSelected = !state.mexicanSelected
    },
    setSpicySelected: (state) => {
      state.spicySelected = !state.spicySelected
    },

    // Preparation
    setOnePotSelected: (state) => {
      state.onePotSelected = !state.onePotSelected
    },
    setQuickAndEasySelected: (state) => {
      state.quickAndEasySelected = !state.quickAndEasySelected
    },
    setMealPrepSelected: (state) => {
      state.mealPrepSelected = !state.mealPrepSelected
    },
  },
})

export const {
  // Meals
  setBreakfastSelected,
  setDinnerSelected,
  setLunchSelected,
  // Dietary
  setDairyFreeSelected,
  setHighProteinSelected,
  setLowCarbSelected,
  setLowFatSelected,
  setNutFreeSelected,
  setPescatarianSelected,
  setVeganSelected,
  setVegetarianSelected,
  // Cuisines
  setAsianSelected,
  setFrenchSelected,
  setItalianSelected,
  setMexicanSelected,
  setSpicySelected,
  // Preparation
  setOnePotSelected,
  setQuickAndEasySelected,
  setMealPrepSelected,
} = mealOptionsSlice.actions

export default mealOptionsSlice.reducer
