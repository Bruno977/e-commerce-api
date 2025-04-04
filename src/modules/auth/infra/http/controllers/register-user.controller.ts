import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/modules/auth/application/use-cases/register-user.use-case';
import { ValidationPipe } from '../pipes/validation-pipe';
import { RequestRegisterUserControllerDTO } from '../dto/register-user.dto';
import { Public } from '../../auth/public';

@Controller('/accounts')
@Public()
export class RegisterUserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ValidationPipe())
    requestRegisterUserDto: RequestRegisterUserControllerDTO,
  ) {
    const { name, email, password, role } = requestRegisterUserDto;
    await this.registerUserUseCase.execute({
      name,
      email,
      password,
      role,
    });
    return {
      message: 'User created successfully',
    };
  }
}
