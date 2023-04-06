import { Recipe } from './recipes.entity';

export class Step {
  description: string;
  id: string;
  recipe: Recipe;
}
