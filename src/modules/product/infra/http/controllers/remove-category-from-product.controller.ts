import { Body, Controller, HttpCode, Param, Patch } from '@nestjs/common';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import { ValidationPipe } from 'src/lib/common/infra/pipes/validation-pipe';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { RemoveCategoryFromProductUseCase } from 'src/modules/product/application/use-cases/remove-category-from-product.use-case';
import { RemoveCategoryFromProductDTO } from '../dto/remove-category-from-product.dto';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';

@Controller('/products/:productId/categories/remove')
@AuthRoles(UserRole.ADMIN)
export class RemoveCategoryFromProductController {
  constructor(
    private removeCategoryFromProductRepository: RemoveCategoryFromProductUseCase,
  ) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('productId') productId: string,
    @Body(new ValidationPipe()) body: RemoveCategoryFromProductDTO,
  ) {
    const result = await this.removeCategoryFromProductRepository.execute({
      productId,
      categoryIds: body.categoryIds,
    });
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
