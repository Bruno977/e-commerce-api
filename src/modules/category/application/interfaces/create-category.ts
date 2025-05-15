import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';

export interface ICreateCategory {
  title: string;
  description: string;
  isActive: boolean;
  slug?: string;
  role: UserRole;
}
