import { Contract } from '@entities/entities';
import faker from 'faker';

export const contractFactory = (options: Partial<Contract> = {}): Contract => {
  return {
    id: faker.datatype.uuid(),
    reference: faker.address.zipCode(),
    ...options,
  };
};
