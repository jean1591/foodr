'use client'

import { setDisplayRecipeDetailsModal } from '@/app/lib/store/features/interactions/slice'
import { useDispatch } from 'react-redux'

export const RecipeItem = ({
  recipe,
}: {
  recipe: {
    icon: string
    label: string
    type: string
  }
}) => {
  const dispatch = useDispatch()

  const { icon, label, type } = recipe

  return (
    <div>
      <div
        onClick={() => dispatch(setDisplayRecipeDetailsModal(true))}
        className="flex items-center justify-between space-x-4 rounded-lg bg-white pr-2 shadow-lg hover:cursor-pointer"
      >
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
    </div>
  )
}
