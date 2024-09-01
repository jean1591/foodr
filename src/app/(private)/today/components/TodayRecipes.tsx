import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'

export const TodayRecipes = () => {
  const latestRecipes: { icon: string; label: string; type: string }[] = [
    { icon: '🥡', label: 'Quick Asian Tofu Bowl', type: 'lunch' },
    { icon: '🍖', label: 'Pork Belly with Bok Choy', type: 'dinner' },
  ]

  return (
    <div className="px-4">
      <p className="text-xl font-bold">Today's recipes</p>

      <div className="mt-4">
        {latestRecipes.length === 0 && (
          <div>
            <p className="text-center">
              No meal plan were found for today, generate a one to get ideas
            </p>

            <button
              className={classNames(
                buttonHoverTransition,
                'mt-4 flex w-full items-center justify-center space-x-4 rounded-xl bg-white py-4 text-slate-600 shadow-lg hover:shadow-none'
              )}
            >
              <p>Generate a weekly meals plan</p>
            </button>
          </div>
        )}

        {latestRecipes.length > 0 && (
          <div className="space-y-4">
            {latestRecipes.map(({ icon, label, type }) => (
              <div className="flex items-center justify-between space-x-4 rounded-lg bg-white pr-2 shadow-lg hover:cursor-pointer">
                <div className="flex items-center justify-start space-x-4">
                  <p className="rounded-r-none rounded-s-lg bg-blue-100 p-4 text-4xl md:text-5xl">
                    {icon}
                  </p>

                  <div>
                    <p className="text-sm font-semibold capitalize">{type}</p>
                    <p className="font-bold">{label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
