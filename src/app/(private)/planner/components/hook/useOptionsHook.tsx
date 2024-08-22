import {
  setAsianSelected,
  setBreakfastSelected,
  setDairyFreeSelected,
  setFrenchSelected,
  setHighProteinSelected,
  setItalianSelected,
  setLowCarbSelected,
  setLowFatSelected,
  setMealPrepSelected,
  setMexicanSelected,
  setNutFreeSelected,
  setOnePotSelected,
  setPescatarianSelected,
  setQuickAndEasySelected,
  setSpicySelected,
  setVeganSelected,
  setVegetarianSelected,
} from '@/app/lib/store/features/mealOptions/slice'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/lib/store/store'

type Option = {
  label: string
  onClick: () => void
  selected: boolean
}

function useOptionsHook(): Option[] {
  const dispatch = useDispatch()
  const {
    breakfastSelected,
    // Dietary
    nutFreeSelected,
    dairyFreeSelected,
    highProteinSelected,
    lowCarbSelected,
    lowFatSelected,
    pescatarianSelected,
    veganSelected,
    vegetarianSelected,
    // Cuisines
    asianSelected,
    frenchSelected,
    italianSelected,
    mexicanSelected,
    spicySelected,
    // Preparation
    mealPrepSelected,
    onePotSelected,
    quickAndEasySelected,
  } = useSelector((state: RootState) => state.mealOptions)

  return [
    {
      label: '☕️ Add breakfast',
      onClick: () => dispatch(setBreakfastSelected()),
      selected: breakfastSelected,
    },

    // Dietary
    {
      label: '🥜 Nut free',
      onClick: () => dispatch(setNutFreeSelected()),
      selected: nutFreeSelected,
    },
    {
      label: '🥛 Dairy free',
      onClick: () => dispatch(setDairyFreeSelected()),
      selected: dairyFreeSelected,
    },
    {
      label: '💪🏼 High protein',
      onClick: () => dispatch(setHighProteinSelected()),
      selected: highProteinSelected,
    },
    {
      label: '🍚 Low carb',
      onClick: () => dispatch(setLowCarbSelected()),
      selected: lowCarbSelected,
    },
    {
      label: '🍙 Low fat',
      onClick: () => dispatch(setLowFatSelected()),
      selected: lowFatSelected,
    },
    {
      label: '🥕 Vegetarian',
      onClick: () => dispatch(setVegetarianSelected()),
      selected: vegetarianSelected,
    },
    {
      label: '🐟 Pescatarian',
      onClick: () => dispatch(setPescatarianSelected()),
      selected: pescatarianSelected,
    },
    {
      label: '☘️ Vegan',
      onClick: () => dispatch(setVeganSelected()),
      selected: veganSelected,
    },

    // Cuisine
    {
      label: '🇰🇷 Asian',
      onClick: () => dispatch(setAsianSelected()),
      selected: asianSelected,
    },
    {
      label: '🇫🇷 French',
      onClick: () => dispatch(setFrenchSelected()),
      selected: frenchSelected,
    },
    {
      label: '🇮🇹 Italian',
      onClick: () => dispatch(setItalianSelected()),
      selected: italianSelected,
    },
    {
      label: '🇲🇽 Mexican',
      onClick: () => dispatch(setMexicanSelected()),
      selected: mexicanSelected,
    },
    {
      label: '🌶️ Spicy',
      onClick: () => dispatch(setSpicySelected()),
      selected: spicySelected,
    },

    // Preparation
    {
      label: '📦 Meal prep',
      onClick: () => dispatch(setMealPrepSelected()),
      selected: mealPrepSelected,
    },
    {
      label: '🫕 One pot',
      onClick: () => dispatch(setOnePotSelected()),
      selected: onePotSelected,
    },
    {
      label: '⚡️ Quick and easy',
      onClick: () => dispatch(setQuickAndEasySelected()),
      selected: quickAndEasySelected,
    },
  ]
}

export default useOptionsHook
