import { GenericRecipeRepository } from '@entities/repositories';
import { Recipe } from '@entities/entities';
import { recipeFactory } from '@entities/factories/recipes.factory';

const recipes = [
  recipeFactory(),
  recipeFactory(),
  recipeFactory(),
  recipeFactory(),
];

export class RecipeRepository implements GenericRecipeRepository {
  async getAll(): Promise<Recipe[]> {
    return recipes;
  }

  async getOneById(recipeId: string): Promise<Recipe> {
    return recipes.find((recipe) => recipe.id === recipeId);
  }
}
