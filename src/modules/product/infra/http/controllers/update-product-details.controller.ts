import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import { ValidationPipe } from 'src/lib/common/infra/pipes/validation-pipe';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { UpdateProductDetailsDTO } from '../dto/update-product-details.dto';
import { UpdateProductDetailsUseCase } from 'src/modules/product/application/use-cases/update-product-details.use-case';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';

@Controller('/products/:id')
@AuthRoles(UserRole.ADMIN)
export class UpdateProductDetailsController {
  constructor(private updateProductRepository: UpdateProductDetailsUseCase) {}
  @Put()
  @HttpCode(204)
  async handle(
    @Body(new ValidationPipe()) body: UpdateProductDetailsDTO,
    @Param('id') id: string,
  ) {
    const result = await this.updateProductRepository.execute({
      id,
      name: body.name,
      description: body.description,
      price: body.price,
      discount: body.discount,
      stock: body.stock,
    });

    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
