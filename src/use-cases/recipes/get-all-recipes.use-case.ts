import { GenericRecipeRepository } from '@entities/repositories';
import { Recipe } from '@entities/entities';

export class GetAllRecipes {
  recipeRepository: GenericRecipeRepository;

  constructor(recipeRepositoryImplementation: GenericRecipeRepository) {
    this.recipeRepository = recipeRepositoryImplementation;
  }

  async execute(): Promise<Recipe[]> {
    return this.recipeRepository.getAll();
  }
}
