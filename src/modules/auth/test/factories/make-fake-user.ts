import { faker } from '@faker-js/faker/.';
import { User } from '../../domain/entities/user';
import { UserRole } from '../../domain/enums/user-role.enum';

export function makeFakeUser() {
  return User.create({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    role: UserRole.ADMIN,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  });
}
