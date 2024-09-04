'use client'

import { RootState } from '@/app/lib/store/store'
import { useSelector } from 'react-redux'

export const RightPanel = () => {
  const { recipes } = useSelector((state: RootState) => state.recipes)

  // TODO: add skeleton
  if (!recipes) {
    return <div></div>
  }

  return (
    <div className="space-y-8">
      {Object.entries(recipes).map(([day, recipes]) => (
        <div key={day}>
          <div className="flex items-center justify-center gap-x-4">
            <p className="text-2xl font-bold capitalize">{day}</p>

            <div className="h-[2px] w-full bg-slate-950"></div>
          </div>

          <div className="mt-4 space-y-4">
            {recipes.map((recipe) => (
              <div key={recipe.label}>
                <div className="flex items-center justify-between space-x-4 rounded-lg bg-white pr-2 shadow-lg hover:cursor-pointer">
                  <div className="flex items-center justify-start space-x-4">
                    <p className="rounded-r-none rounded-s-lg bg-blue-100 p-4 text-4xl md:text-5xl">
                      {recipe.icon}
                    </p>

                    <div>
                      <p className="text-sm font-semibold capitalize">
                        {recipe.type}
                      </p>
                      <p className="font-bold">{recipe.label}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
