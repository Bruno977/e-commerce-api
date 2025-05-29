import { Controller, Get, HttpCode } from '@nestjs/common';
import { FindAllProductsUseCase } from 'src/modules/product/application/use-cases/find-all-products.use-case';
import { ProductPresenter } from '../presenters/product.presenter';
import { Public } from 'src/modules/auth/infra/auth/public';

@Controller('/products')
@Public()
export class FindAllProductsController {
  constructor(private findAllProductsRepository: FindAllProductsUseCase) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const products = await this.findAllProductsRepository.execute();
    return {
      products: products.value?.products.map((product) =>
        ProductPresenter.toHttp(product),
      ),
    };
  }
}
