import { Controller, Get, HttpCode } from '@nestjs/common';
import { FindAllProductsUseCase } from 'src/modules/product/application/use-cases/find-all-products.use-case';
import { ProductPresenter } from '../presenters/product.presenter';
import { Public } from 'src/modules/auth/infra/auth/public';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/products')
@Public()
@ApiTags('Product')
export class FindAllProductsController {
  constructor(private findAllProductsRepository: FindAllProductsUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Retrieve all products',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all products',
  })
  async handle() {
    const products = await this.findAllProductsRepository.execute();
    return {
      products: products.value?.products.map((product) =>
        ProductPresenter.toHttp(product),
      ),
    };
  }
}
