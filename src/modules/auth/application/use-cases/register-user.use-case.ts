import { UserRepository } from '../../domain/repositories/user.repository';
import { ResourceAlreadyExistsError } from 'src/lib/common/errors/resource-already-exists.error';
import { RequestRegisterUserDto } from '../dtos/register-user.dto';
import { User } from '../../domain/entities/user';
import { UserRole } from '../../domain/enums/user-role.enum';
import { NotAllowedError } from 'src/lib/common/errors/not-allowed.error';
import { Hasher } from '../cryptography/hasher';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: Hasher,
  ) {}

  async execute({ email, name, password, role }: RequestRegisterUserDto) {
    console.log('userRepository', this.userRepository);
    console.log('hasher', this.hasher);
    if (role !== UserRole.ADMIN) {
      throw new NotAllowedError('Only admin can create users');
    }
    console.log('role', this.userRepository);
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new ResourceAlreadyExistsError('User already exists');
    }

    const hashedPassword = await this.hasher.hash(password);

    const user = new User({
      email,
      name,
      password: hashedPassword,
      role,
    });

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
