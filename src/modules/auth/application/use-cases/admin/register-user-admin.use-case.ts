import { AdminRepository } from 'src/modules/auth/domain/repositories/admin.repository';
import { RequestRegisterAdminDto } from '../../dtos/admin/register-admin.dto';
import { Admin } from 'src/modules/auth/domain/entities/admin';
import { ResourceAlreadyExistsError } from 'src/lib/common/errors/resource-already-exists.error';

export class RegisterUserAdminUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute({ email, name, password, role }: RequestRegisterAdminDto) {
    const userAlreadyExists = await this.adminRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new ResourceAlreadyExistsError('User already exists');
    }
    const adminUser = new Admin({
      email,
      name,
      password,
      role,
    });

    await this.adminRepository.create(adminUser);
  }
}
