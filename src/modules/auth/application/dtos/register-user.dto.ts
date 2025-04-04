import { UserRole } from '../../domain/enums/user-role.enum';

export class RequestRegisterUserDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
