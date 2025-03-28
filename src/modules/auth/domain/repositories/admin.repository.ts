import { Admin } from '../entities/admin';

export interface AdminRepository {
  create(user: Admin): Promise<void>;
  findByEmail(email: string): Promise<Admin | null>;
}
