import { NotAllowedError } from 'src/lib/common/errors/not-allowed.error';
import { UserRole } from '../../domain/enums/user-role.enum';
import { FakeHasher } from '../../test/cryptography/fake-hasher';
import { InMemoryUserRepository } from '../../test/repositories/in-memory-user.repository';
import { RegisterUserUseCase } from './register-user.use-case';
import { ResourceAlreadyExistsError } from 'src/lib/common/errors/resource-already-exists.error';

let userRepository: InMemoryUserRepository;
let registerUserUseCase: RegisterUserUseCase;
let fakeHasher: FakeHasher;
describe('RegisterUserUseCase', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    fakeHasher = new FakeHasher();
    registerUserUseCase = new RegisterUserUseCase(userRepository, fakeHasher);
  });
  it('should be able to register a new user', async () => {
    await registerUserUseCase.execute({
      email: 'admin@admin.com',
      name: 'admin',
      password: '123456',
      role: UserRole.ADMIN,
    });
    expect(userRepository.users).toHaveLength(1);
  });
  it("should hash user's password upon registration", async () => {
    await registerUserUseCase.execute({
      email: 'admin@admin.com',
      name: 'admin',
      password: '123456',
      role: UserRole.ADMIN,
    });
    const user = userRepository.users[0];
    expect(user.password).toEqual('123456-hashed');
  });
  it('should not be able to register a new user with same email twice', async () => {
    await registerUserUseCase.execute({
      email: 'admin@admin.com',
      name: 'admin',
      password: '123456',
      role: UserRole.ADMIN,
    });
    const result = await registerUserUseCase.execute({
      email: 'admin@admin.com',
      name: 'admin',
      password: '123456',
      role: UserRole.ADMIN,
    });
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError);
  });
  it('should allow admin user to create a new user', async () => {
    const result = await registerUserUseCase.execute({
      email: 'admin@admin.com',
      name: 'admin',
      password: '123456',
      role: UserRole.VIEWER,
    });
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
