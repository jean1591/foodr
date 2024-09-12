'use client'

import { RecipeDetails } from './RecipeDetails'
import { Recipes } from './Recipes'
import { RootState } from '@/app/lib/store/store'
import { useSelector } from 'react-redux'

export const RightPanel = () => {
  const { displayRecipeDetails } = useSelector(
    (state: RootState) => state.interactions
  )

  return <div>{displayRecipeDetails ? <RecipeDetails /> : <Recipes />}</div>
}
