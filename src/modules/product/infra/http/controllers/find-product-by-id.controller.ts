import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { Public } from 'src/modules/auth/infra/auth/public';
import { FindProductByIdUseCase } from 'src/modules/product/application/use-cases/find-product-by-id.use-case';
import { ProductPresenter } from '../presenters/product.presenter';

@Controller('/products/:id')
@Public()
export class FindProductByIdController {
  constructor(private findByIdUseCase: FindProductByIdUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    const result = await this.findByIdUseCase.execute(id);
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
    return ProductPresenter.toHttp(result.value.product);
  }
}
