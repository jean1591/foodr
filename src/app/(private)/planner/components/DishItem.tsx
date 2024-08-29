import { Meal, MealType } from '@/utils/interfaces/meals'

import { classNames } from '@/utils/classNames'
import { setDisplayRecipeDetailsModal } from '@/app/lib/store/features/interactions/slice'
import { setSelectedMeal } from '@/app/lib/store/features/meals/slice'
import useColour from './hook/useColour'
import { useDispatch } from 'react-redux'

export const DishItem = ({ type, meal }: { type: MealType; meal: Meal }) => {
  const dispatch = useDispatch()

  const { bgColor, borderColor, textColor } = useColour(meal.color)

  const handleDishItemOnClick = () => {
    dispatch(setSelectedMeal({ meal, type }))
    dispatch(setDisplayRecipeDetailsModal(true))
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
