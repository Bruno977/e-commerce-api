import { Either, right } from 'src/lib/common/either/either';
import { Category } from '../../domain/entities/category';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { Injectable } from '@nestjs/common';

type ResponseFindCategoryByIdUseCase = Promise<
  Either<
    null,
    {
      categories: Category[];
    }
  >
>;
@Injectable()
export class FindAllCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}
  async execute(): ResponseFindCategoryByIdUseCase {
    const categories = await this.categoryRepository.findAll();

    return right({
      categories,
    });
  }
}
