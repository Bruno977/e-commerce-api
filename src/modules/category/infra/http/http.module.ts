import { Module } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.use-case';
import { DatabaseModule } from '../database/database.module';
import { CreateCategoryController } from './controllers/create-category.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateCategoryController],
  providers: [CreateCategoryUseCase],
})
export class CategoryHttpModule {}
