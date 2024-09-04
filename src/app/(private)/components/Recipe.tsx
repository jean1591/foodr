'use client'

import { RecipeDetailsModal } from './RecipeDetails'
import { RootState } from '@/app/lib/store/store'
import { useSelector } from 'react-redux'

export const Recipe = () => {
  const { displayRecipeDetailsModal } = useSelector(
    (state: RootState) => state.interactions
  )

  return <div>{displayRecipeDetailsModal && <RecipeDetailsModal />}</div>
}
