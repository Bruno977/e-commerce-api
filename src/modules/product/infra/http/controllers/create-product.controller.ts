import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import { ValidationPipe } from 'src/lib/common/infra/pipes/validation-pipe';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { CreateProductControllerDTO } from '../dto/create-product.dto';
import { CreateProductUseCase } from 'src/modules/product/application/use-cases/create-product-use-case';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';

@Controller('/products')
export class CreateProductController {
  constructor(private createProduct: CreateProductUseCase) {}
  @Post()
  @HttpCode(201)
  @AuthRoles(UserRole.ADMIN)
  async handle(@Body(new ValidationPipe()) body: CreateProductControllerDTO) {
    const result = await this.createProduct.execute(body);
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
