import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateCategoryUseCase } from 'src/modules/category/application/use-cases/create-category.use-case';
import { CreateCategoryDTO } from '../dto/create-category.dto';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { ValidationPipe } from 'src/lib/common/infra/pipes/validation-pipe';
import { CurrentUser } from 'src/lib/common/infra/decorators/current-user.decorator';
import { JwtPayload } from 'src/modules/auth/infra/auth/jwt.strategy';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';

@Controller('/categories')
export class CreateCategoryController {
  constructor(private createCategory: CreateCategoryUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ValidationPipe()) body: CreateCategoryDTO,
    @CurrentUser() user: JwtPayload,
  ) {
    const { title, description, isActive } = body;
    const result = await this.createCategory.execute({
      title,
      description,
      isActive,
      role: user.role as UserRole,
    });
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
