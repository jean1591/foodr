import { Step } from '@entities/entities';
import faker from 'faker';

export const stepFactory = (options: Partial<Step> = {}): Step => {
  return {
    description: faker.company.catchPhrase(),
    id: faker.datatype.uuid(),
    ...options,
  };
};

export const generateXSteps = (stepQuantity = 5): Step[] => {
  const steps: Step[] = [];

  for (let index = 0; index < stepQuantity; index++) {
    steps.push(stepFactory());
  }

  return steps;
};
