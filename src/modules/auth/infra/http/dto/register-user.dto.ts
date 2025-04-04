import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';

export class RequestRegisterUserControllerDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
