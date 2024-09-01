import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'

export const QuickRecipes = () => {
  const quickRecipes = [
    { label: 'rice', icon: '🍚' },
    { label: 'pasta', icon: '🍝' },
    { label: 'eggs', icon: '🍳' },
    { label: 'potato', icon: '🥔' },
  ]

  return (
    <div className="px-4">
      <p className="text-xl font-bold">Quick recipes</p>

      <div className="mt-4 flex items-center justify-between">
        {quickRecipes.map(({ label, icon }) => (
          <button
            key={label}
            className={classNames(
              buttonHoverTransition,
              'h-20 w-20 rounded-lg bg-white p-4 text-center shadow-lg hover:shadow-none'
            )}
          >
            <p className="text-2xl">{icon}</p>
            <p className="capitalize">{label}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
