'use client'

import { RecipeDetailsModal } from './RecipeDetailsModal'
import { RootState } from '@/app/lib/store/store'
import { useSelector } from 'react-redux'

export const Recipe = () => {
  const { displayRecipeDetailsModal } = useSelector(
    (state: RootState) => state.interactions
  )

  return <div>{displayRecipeDetailsModal && <RecipeDetailsModal />}</div>
}
