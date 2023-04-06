import { Author } from '@entities/entities';
import faker from 'faker';

export const authorFactory = (options: Partial<Author> = {}): Author => {
  return {
    firstname: faker.name.firstName(),
    id: faker.datatype.uuid(),
    lastname: faker.name.lastName(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    ...options,
  };
};
