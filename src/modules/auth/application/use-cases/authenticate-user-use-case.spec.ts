import { NotAllowedError } from 'src/lib/common/errors/not-allowed.error';
import { UserRole } from '../../domain/enums/user-role.enum';
import { FakeHasher } from '../../test/cryptography/fake-hasher';
import { InMemoryUserRepository } from '../../test/repositories/in-memory-user.repository';
import { AuthenticateUserUseCase } from './authenticate-user.use-case';
import { RegisterUserUseCase } from './register-user.use-case';

let fakeHasher: FakeHasher;
let inMemoryRepositoryUser: InMemoryUserRepository;
let registerUserUseCase: RegisterUserUseCase;
let sut: AuthenticateUserUseCase;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    fakeHasher = new FakeHasher();
    inMemoryRepositoryUser = new InMemoryUserRepository();
    registerUserUseCase = new RegisterUserUseCase(
      inMemoryRepositoryUser,
      fakeHasher,
    );
    sut = new AuthenticateUserUseCase(inMemoryRepositoryUser, fakeHasher);
  });
  it('should be able to authenticate a user', async () => {
    const { user } = await registerUserUseCase.execute({
      email: 'admin@admin.com',
      name: 'admin',
      password: '123456',
      role: UserRole.ADMIN,
    });
    const userAuth = await sut.execute({
      email: user.email,
      password: '123456',
    });
    expect(userAuth).toEqual({
      accessToken: expect.any(String) as string,
    });
  });
  it('should not be able to authenticate a user with wrong password', async () => {
    const { user } = await registerUserUseCase.execute({
      email: 'admin@admin.com',
      name: 'admin',
      password: '123456',
      role: UserRole.ADMIN,
    });
    await expect(
      sut.execute({
        email: user.email,
        password: '1234567',
      }),
    ).rejects.toThrow(new NotAllowedError('Invalid credentials'));
  });
  it('should not be able to authenticate a non-existent user', async () => {
    await expect(
      sut.execute({
        email: 'admin@admin.com',
        password: '123456',
      }),
    ).rejects.toThrow(new NotAllowedError('Invalid credentials'));
  });
});
