import { Recipe } from './recipes.entity';

export class Ingredient {
  id: string;
  name: string;
  quantity: number;
  recipe: Recipe;
}
