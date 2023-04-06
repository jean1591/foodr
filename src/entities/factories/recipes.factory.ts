import { Recipe } from '@entities/entities';
import faker from 'faker';
import { generateXIngredients } from './ingredients.factory';
import { generateXSteps } from './steps.factory';

export const recipeFactory = (options: Partial<Recipe> = {}): Recipe => {
  const ingredients = options.ingredients
    ? options.ingredients
    : generateXIngredients();
  const steps = options.steps ? options.steps : generateXSteps();

  return {
    id: faker.datatype.uuid(),
    ingredients,
    name: faker.company.companyName(),
    steps,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    ...options,
  };
};
