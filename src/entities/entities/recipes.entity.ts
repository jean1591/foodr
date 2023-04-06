import { Ingredient } from './ingredients.entity';
import { Step } from './steps.entity';

export class Recipe {
  id: string;
  ingredients: Ingredient[];
  name: string;
  steps: Step[];

  createdAt: Date;
  updatedAt: Date;
}
