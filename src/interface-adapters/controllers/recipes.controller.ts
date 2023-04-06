import { GetAllRecipes, GetRecipeById } from '@use-cases/recipes';

import { GenericRecipeRepository } from '@entities/repositories';
import { Recipe } from '@entities/entities';

export class RecipesController {
  recipeRepository: GenericRecipeRepository;

  constructor(recipeRepositoryImplementation: GenericRecipeRepository) {
    this.recipeRepository = recipeRepositoryImplementation;
  }

  async getRecipess(): Promise<Recipe[]> {
    const useCase = new GetAllRecipes(this.recipeRepository);

    return useCase.execute();
  }

  async getRecipeById(recipeId: string): Promise<Recipe> {
    const useCase = new GetRecipeById(this.recipeRepository);

    return useCase.execute(recipeId);
  }
}
