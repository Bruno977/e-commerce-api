import { Module } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.use-case';
import { DatabaseModule } from '../database/database.module';
import { CreateCategoryController } from './controllers/create-category.controller';
import { FindCategoryByIdController } from './controllers/find-category-by-id.controller';
import { FindCategoryByIdUseCase } from '../../application/use-cases/find-category-by-id.use-case';
import { FindCategoryBySlugController } from './controllers/find-category-by-slug.controller';
import { FindCategoryBySlugUseCase } from '../../application/use-cases/find-category-by-slug.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateCategoryController,
    FindCategoryByIdController,
    FindCategoryBySlugController,
  ],
  providers: [
    CreateCategoryUseCase,
    FindCategoryByIdUseCase,
    FindCategoryBySlugUseCase,
  ],
})
export class CategoryHttpModule {}
