import { faker } from '@faker-js/faker';
import { Category, CategoryProps } from '../../domain/entities/category';

export function makeFakeCategory(override: Partial<CategoryProps> = {}) {
  return Category.create({
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    ...override,
  });
}
