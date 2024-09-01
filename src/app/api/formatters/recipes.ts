import { DbRecipeItem } from '../interfaces/recipes'
import { RecipeItem } from '@/utils/interfaces/recipes'

export const formatDbRecipeItemToRecipeItem = (
  recipe: DbRecipeItem
): RecipeItem => {
  return {
    icon: recipe.icon ?? '',
    label: recipe.name,
    type: recipe.type ?? '',
  }
}
