import { Colours, Meal, MealType } from '@/utils/interfaces/meals'

import { classNames } from '@/utils/classNames'

const colorToBorderColorMapper: Record<Colours, string> = {
  amber: 'border-amber-100',
  blue: 'border-blue-100',
  gray: 'border-gray-100',
  green: 'border-green-100',
  indigo: 'border-indigo-100',
  orange: 'border-orange-100',
  pink: 'border-pink-100',
  purple: 'border-purple-100',
  red: 'border-red-100',
  teal: 'border-teal-100',
  yellow: 'border-yellow-100',
}

const colorToBgColorMapper: Record<Colours, string> = {
  amber: 'bg-amber-100',
  blue: 'bg-blue-100',
  gray: 'bg-gray-100',
  green: 'bg-green-100',
  indigo: 'bg-indigo-100',
  orange: 'bg-orange-100',
  pink: 'bg-pink-100',
  purple: 'bg-purple-100',
  red: 'bg-red-100',
  teal: 'bg-teal-100',
  yellow: 'bg-yellow-100',
}

const colorToTextColorMapper: Record<Colours, string> = {
  amber: 'text-amber-900/75',
  blue: 'text-blue-900/75',
  gray: 'text-gray-900/75',
  green: 'text-green-900/75',
  indigo: 'text-indigo-900/75',
  orange: 'text-orange-900/75',
  pink: 'text-pink-900/75',
  purple: 'text-purple-900/75',
  red: 'text-red-900/75',
  teal: 'text-teal-900/75',
  yellow: 'text-yellow-900/75',
}

export const DishItem = ({ type, meal }: { type: MealType; meal: Meal }) => {
  return (
    <div
      className={classNames(
        colorToBorderColorMapper[meal.color],
        'flex items-center justify-between space-x-4 rounded-lg border-2 bg-white pr-2 shadow-lg'
      )}
    >
      <div className="flex items-center justify-start space-x-4">
        <p
          className={classNames(
            colorToBgColorMapper[meal.color],
            'rounded-sm p-4 text-4xl md:text-5xl'
          )}
        >
          {meal.icon}
        </p>

        <div>
          <p
            className={classNames(
              colorToTextColorMapper[meal.color],
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
