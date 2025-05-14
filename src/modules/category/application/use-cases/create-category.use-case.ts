import { Either, right } from 'src/lib/common/either/either';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { ICreateCategory } from '../interfaces/create-category';
import { NotAllowedError } from 'src/lib/common/errors/not-allowed.error';
import { Category } from '../../domain/entities/category';
import { Injectable } from '@nestjs/common';

type ResponseCreateCategoryUseCase = Promise<Either<NotAllowedError, null>>;

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(
    categoryData: ICreateCategory,
  ): Promise<ResponseCreateCategoryUseCase> {
    const { title, description, isActive } = categoryData;

    const newCategory = Category.create({
      title,
      description,
      isActive,
    });
    console.log('newCategory', newCategory);

    await this.categoryRepository.create(newCategory);

    return right(null);
  }
}
