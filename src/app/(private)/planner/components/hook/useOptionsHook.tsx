import { Categories, Option } from '@/utils/interfaces/options'
import {
  setAsianSelected,
  setBreakfastSelected,
  setDairyFreeSelected,
  setDinnerSelected,
  setFrenchSelected,
  setHighProteinSelected,
  setItalianSelected,
  setLowCarbSelected,
  setLowFatSelected,
  setLunchSelected,
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

type Options = Record<Categories, Option[]>

function useOptionsHook(): Options {
  const dispatch = useDispatch()
  const {
    breakfastSelected,
    lunchSelected,
    dinnerSelected,
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

  return {
    meals: [
      {
        label: '☕️ Breakfast',
        onClick: () => dispatch(setBreakfastSelected()),
        selected: breakfastSelected,
      },
      {
        label: '🥪 Lunch',
        onClick: () => dispatch(setLunchSelected()),
        selected: lunchSelected,
      },
      {
        label: '🍽️ Dinner',
        onClick: () => dispatch(setDinnerSelected()),
        selected: dinnerSelected,
      },
    ],
    dietary: [
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
    ],
    cuisine: [
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
    ],
    preparation: [
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
    ],
  }
}

export default useOptionsHook
