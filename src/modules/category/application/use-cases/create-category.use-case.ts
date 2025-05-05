import { Either, left, right } from 'src/lib/common/either/either';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { ICreateCategory } from '../interfaces/create-category';
import { NotAllowedError } from 'src/lib/common/errors/not-allowed.error';
import { Category } from '../../domain/entities/category';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';

type ResponseCreateCategoryUseCase = Promise<
  Either<
    NotAllowedError,
    {
      category: Category;
    }
  >
>;
export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(
    categoryData: ICreateCategory,
  ): Promise<ResponseCreateCategoryUseCase> {
    const { title, description, isActive, role } = categoryData;
    if (role !== UserRole.ADMIN) {
      return left(new NotAllowedError('Only admin can create category'));
    }

    const newCategory = Category.create({
      title,
      description,
      isActive,
    });

    const category = await this.categoryRepository.create(newCategory);

    return right({
      category,
    });
  }
}
