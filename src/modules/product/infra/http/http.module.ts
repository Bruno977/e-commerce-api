import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateProductController } from './controllers/create-product.controller';
import { CreateProductUseCase } from '../../application/use-cases/create-product-use-case';
import { FindProductByIdController } from './controllers/find-product-by-id.controller';
import { FindProductByIdUseCase } from '../../application/use-cases/find-product-by-id.use-case';
import { UpdateProductDetailsController } from './controllers/update-product-details.controller';
import { UpdateProductDetailsUseCase } from '../../application/use-cases/update-product-details.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateProductController,
    FindProductByIdController,
    UpdateProductDetailsController,
  ],
  providers: [
    CreateProductUseCase,
    FindProductByIdUseCase,
    UpdateProductDetailsUseCase,
  ],
})
export class ProductHttpModule {}
