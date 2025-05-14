import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';

export class CreateCategoryDTO {
  title: string;
  description: string;
  isActive: boolean;
  role: UserRole;
}
