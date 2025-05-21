import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { UpdateCategoryDetailsUseCase } from 'src/modules/category/application/use-cases/update-category-details.use-case';
import { UpdateCategoryDTO } from '../dto/update-category.dto';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { ValidationPipe } from 'src/lib/common/infra/pipes/validation-pipe';

@Controller('/categories/:id')
export class UpdateCategoryDetailsController {
  constructor(private updateCategoryDetails: UpdateCategoryDetailsUseCase) {}
  @Put()
  @AuthRoles(UserRole.ADMIN)
  @HttpCode(204)
  async handle(
    @Body(new ValidationPipe()) body: UpdateCategoryDTO,
    @Param('id') id: string,
  ) {
    const { description, isActive, title } = body;

    const result = await this.updateCategoryDetails.execute({
      id: id,
      description,
      isActive,
      title,
    });

    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
