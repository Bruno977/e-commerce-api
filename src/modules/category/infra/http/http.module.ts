import { Module } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.use-case';
import { DatabaseModule } from '../database/database.module';
import { CreateCategoryController } from './controllers/create-category.controller';
import { FindCategoryByIdController } from './controllers/find-category-by-id.controller';
import { FindCategoryByIdUseCase } from '../../application/use-cases/find-category-by-id.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateCategoryController, FindCategoryByIdController],
  providers: [CreateCategoryUseCase, FindCategoryByIdUseCase],
})
export class CategoryHttpModule {}
