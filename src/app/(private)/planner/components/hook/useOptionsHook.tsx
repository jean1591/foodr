import {
  setBreakfastSelected,
  setVegetarianSelected,
} from '@/app/lib/store/features/meals/slice'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/lib/store/store'

type Option = {
  label: string
  onClick: () => void
  selected: boolean
}

function useOptionsHook(): Option[] {
  const dispatch = useDispatch()
  const { vegetarianSelected, breakfastSelected } = useSelector(
    (state: RootState) => state.meals
  )

  return [
    {
      label: '☕️ Add breakfast',
      onClick: () => dispatch(setBreakfastSelected()),
      selected: breakfastSelected,
    },
    {
      label: '🥕 Vegetarian',
      onClick: () => dispatch(setVegetarianSelected()),
      selected: vegetarianSelected,
    },
  ]
}

export default useOptionsHook
