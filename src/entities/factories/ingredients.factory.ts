import { Ingredient, Units } from '@entities/entities';

import faker from 'faker';
import { sample } from 'lodash';

export const ingredientFactory = (
  options: Partial<Ingredient> = {},
): Ingredient => {
  return {
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    quantity: faker.datatype.number(),
    unit: sample(Object.values(Units)),
    ...options,
  };
};

export const generateXIngredients = (ingredientQuantity = 5): Ingredient[] => {
  const ingredients: Ingredient[] = [];

  for (let index = 0; index < ingredientQuantity; index++) {
    ingredients.push(ingredientFactory());
  }

  return ingredients;
};
