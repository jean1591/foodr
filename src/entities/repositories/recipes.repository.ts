import { Recipe } from '@entities/entities';

export interface GenericRecipeRepository {
  getAll: () => Promise<Recipe[]>;
  getOneById: (id: string) => Promise<Recipe>;
}
