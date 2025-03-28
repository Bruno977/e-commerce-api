import { Admin } from '../../domain/entities/admin';
import { AdminRepository } from '../../domain/repositories/admin.repository';

export class InMemoryAdminRepository implements AdminRepository {
  public users: Admin[] = [];
  async create(user: Admin) {
    this.users.push(user);
  }
  async findByEmail(email: string): Promise<Admin | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      return null;
    }
    return user;
  }
}
