import { Meal, MealType } from '@/utils/interfaces/meals'
import {
  setDisplayNoCreditsModal,
  setDisplayRecipeDetailsModal,
} from '@/app/lib/store/features/interactions/slice'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/lib/store/store'
import { classNames } from '@/utils/classNames'
import { setSelectedMeal } from '@/app/lib/store/features/meals/slice'
import { setUser } from '@/app/lib/store/features/user/slice'
import useColour from './hook/useColour'

export const DishItem = ({ type, meal }: { type: MealType; meal: Meal }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)

  const { bgColor, borderColor, textColor } = useColour(meal.color)

  if (!user) {
    return <></>
  }

  const handleDishItemOnClick = () => {
    dispatch(setSelectedMeal({ meal, type }))
    if (user.credits > 0) {
      dispatch(setSelectedMeal({ meal, type }))
      dispatch(setDisplayRecipeDetailsModal(true))
      dispatch(setUser({ ...user, credits: user.credits - 1 }))
    } else {
      dispatch(setDisplayNoCreditsModal(true))
    }
  }

  return (
    <div
      onClick={handleDishItemOnClick}
      className={classNames(
        borderColor,
        'flex items-center justify-between space-x-4 rounded-lg border-2 bg-white pr-2 shadow-lg hover:cursor-pointer'
      )}
    >
      <div className="flex items-center justify-start space-x-4">
        <p
          className={classNames(bgColor, 'rounded-sm p-4 text-4xl md:text-5xl')}
        >
          {meal.icon}
        </p>

        <div>
          <p
            className={classNames(
              textColor,
              'text-sm font-semibold capitalize'
            )}
          >
            {type}
          </p>
          <p className="font-bold">{meal.name}</p>
        </div>
      </div>
    </div>
  )
}
