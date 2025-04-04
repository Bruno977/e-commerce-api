import { Prisma, User as UserPrisma } from '@prisma/client';
import { User } from 'src/modules/auth/domain/entities/user';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';

export class PrismaUserMapper {
  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  static toDomain(raw: UserPrisma): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        role: raw.role as UserRole,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
