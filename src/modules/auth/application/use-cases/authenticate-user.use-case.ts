import { NotAllowedError } from 'src/lib/common/errors/not-allowed.error';
import { UserRepository } from '../../domain/repositories/user.repository';
import { Hasher } from '../cryptography/hasher';
import { RequestAuthenticateUserDTO } from '../dtos/authenticate-user.dto';
import { Encrypt } from '../cryptography/encrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
    private readonly encrypt: Encrypt,
  ) {}

  async execute({ email, password }: RequestAuthenticateUserDTO) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotAllowedError('Invalid credentials');
    }

    const isSamePassword = await this.hasher.compare(password, user.password);

    if (!isSamePassword) {
      throw new NotAllowedError('Invalid credentials');
    }
    const accessToken = await this.encrypt.encrypt({
      sub: user.id,
      role: user.role,
    });
    return {
      accessToken,
    };
  }
}
