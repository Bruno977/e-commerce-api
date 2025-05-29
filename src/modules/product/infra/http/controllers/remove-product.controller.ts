import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { RemoveProductUseCase } from 'src/modules/product/application/use-cases/remove-product.use-case';

@Controller('/products/:id')
@AuthRoles(UserRole.ADMIN)
export class RemoveProductController {
  constructor(private removeProductRepository: RemoveProductUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    const result = await this.removeProductRepository.execute(id);
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
