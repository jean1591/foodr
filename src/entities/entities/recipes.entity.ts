import { Author } from './authors.entity';
import { Ingredient } from './ingredients.entity';
import { Step } from './steps.entity';

export class Recipe {
  author: Author;
  id: string;
  ingredients: Ingredient[];
  steps: Step[];

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
