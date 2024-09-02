import { DbRecipeItem, DbRecipeWithRelations } from '../interfaces/recipes'
import { Recipe, RecipeItem } from '@/utils/interfaces/recipes'

export const formatDbRecipeItemToRecipeItem = (
  recipe: DbRecipeItem
): RecipeItem => {
  return {
    icon: recipe.icon ?? '',
    label: recipe.name,
    type: recipe.type ?? '',
  }
}

export const formatDbRecipeToRecipe = (
  recipe: DbRecipeWithRelations
): Recipe => {
  return {
    cookTime: recipe.cook_time,
    description: recipe.description,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions.map((instruction) => ({
      ...instruction,
      stepNumber: instruction.step_number,
    })),
    name: recipe.name,
    prepTime: recipe.prep_time,
  }
}
