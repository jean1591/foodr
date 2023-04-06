import { GenericRecipeRepository } from '@entities/repositories';
import { Recipe } from '@entities/entities';

export class GetRecipeById {
  recipeRepository: GenericRecipeRepository;

  constructor(recipeRepositoryImplementation: GenericRecipeRepository) {
    this.recipeRepository = recipeRepositoryImplementation;
  }

  async execute(contractId: string): Promise<Recipe> {
    return this.recipeRepository.getOneById(contractId);
  }
}
