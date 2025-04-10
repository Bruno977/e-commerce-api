import { UserRepository } from '../../domain/repositories/user.repository';
import { ResourceAlreadyExistsError } from 'src/lib/common/errors/resource-already-exists.error';
import { RequestRegisterUserDto } from '../dtos/register-user.dto';
import { User } from '../../domain/entities/user';
import { UserRole } from '../../domain/enums/user-role.enum';
import { NotAllowedError } from 'src/lib/common/errors/not-allowed.error';
import { Hasher } from '../cryptography/hasher';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/lib/common/either/either';

type ResponseRegisterUserUseCase = Promise<
  Either<ResourceAlreadyExistsError | NotAllowedError, { user: User }>
>;

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: Hasher,
  ) {}

  async execute({
    email,
    name,
    password,
    role,
  }: RequestRegisterUserDto): ResponseRegisterUserUseCase {
    if (role !== UserRole.ADMIN) {
      return left(new NotAllowedError('Only admin can create users'));
    }
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      return left(new ResourceAlreadyExistsError('User already exists'));
    }

    const hashedPassword = await this.hasher.hash(password);

    const user = new User({
      email,
      name,
      password: hashedPassword,
      role,
    });

    await this.userRepository.create(user);
    return right({ user });
  }
}
