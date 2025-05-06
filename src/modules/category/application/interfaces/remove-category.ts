import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';

export interface IRemoveCategory {
  categoryId: string;
  role: UserRole;
}
