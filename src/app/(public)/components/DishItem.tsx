import { Colours, Meal, Meals } from '@/utils/interfaces/meals'

import { classNames } from '@/utils/classNames'

const colorToBgColorMapper: Record<Colours, string> = {
  blue: 'bg-blue-100',
  green: 'bg-green-100',
  red: 'bg-red-100',
  yellow: 'bg-yellow-100',
  gray: 'bg-gray-100',
  teal: 'bg-teal-100',
  pink: 'bg-pink-100',
  purple: 'bg-purple-100',
  brown: 'bg-brown-100',
  orange: 'bg-orange-100',
}

const colorToTextColorMapper: Record<Colours, string> = {
  blue: 'text-blue-900/75',
  green: 'text-green-900/75',
  red: 'text-red-900/75',
  yellow: 'text-yellow-900/75',
  gray: 'text-gray-900/75',
  teal: 'text-teal-900/75',
  pink: 'text-pink-900/75',
  purple: 'text-purple-900/75',
  brown: 'text-brown-900/75',
  orange: 'text-orange-900/75',
}

export const DishItem = ({ type, meal }: { type: Meals; meal: Meal }) => {
  return (
    <div
      className={classNames(
        colorToBgColorMapper[meal.color],
        'relative rounded-lg p-4 shadow-lg'
      )}
    >
      <div className="absolute bottom-3/4 left-1/2 -translate-x-1/2 transform">
        <p className="rounded-full bg-white p-4 text-5xl">{meal.icon}</p>
      </div>

      <div className="mt-8">
        <p
          className={classNames(
            colorToTextColorMapper[meal.color],
            'capitaliz text-sm font-semibold capitalize'
          )}
        >
          {type}
        </p>
        <p className="mt-2 font-bold">{meal.name}</p>
        <p className="mt-4 text-xs text-slate-400">{meal.calories} kcal</p>
      </div>
    </div>
  )
}
