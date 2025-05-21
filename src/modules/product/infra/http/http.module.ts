import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateProductController } from './controllers/create-product.controller';
import { CreateProductUseCase } from '../../application/use-cases/create-product-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateProductController],
  providers: [CreateProductUseCase],
})
export class ProductHttpModule {}
