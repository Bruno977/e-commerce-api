import { InMemoryAdminRepository } from 'src/modules/auth/test/repositories/in-memory-admin.repository';
import { RegisterUserAdminUseCase } from './register-user-admin.use-case';

let adminRepository: InMemoryAdminRepository;
let registerUserAdminUseCase: RegisterUserAdminUseCase;
describe('RegisterUserAdminUseCase', () => {
  beforeEach(async () => {
    adminRepository = new InMemoryAdminRepository();
    registerUserAdminUseCase = new RegisterUserAdminUseCase(adminRepository);
  });
  it('should be able to register a new user', async () => {
    await registerUserAdminUseCase.execute({
      email: 'admin@admin.com',
      name: 'admin',
      password: '123456',
      role: 'admin',
    });
    expect(adminRepository.users).toHaveLength(1);
  });
  it('should not be able to register a new user with same email twice', async () => {
    await registerUserAdminUseCase.execute({
      email: 'admin@admin.com',
      name: 'admin',
      password: '123456',
      role: 'admin',
    });
    await expect(
      registerUserAdminUseCase.execute({
        email: 'admin@admin.com',
        name: 'admin',
        password: '123456',
        role: 'admin',
      }),
    ).rejects.toThrow('User already exists');
  });
});
