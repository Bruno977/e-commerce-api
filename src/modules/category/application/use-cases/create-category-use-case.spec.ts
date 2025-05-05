import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { InMemoryCategoryRepository } from '../../test/repositories/in-memory-category.repository';
import { CreateCategoryUseCase } from './create-category.use-case';

let sut: CreateCategoryUseCase;
let inMemoryCategoryRepository: InMemoryCategoryRepository;
describe('CreateCategoryUseCase', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new CreateCategoryUseCase(inMemoryCategoryRepository);
  });
  it('should create a category', async () => {
    const categoryData = {
      title: 'Category 1',
      description: 'Description 1',
      isActive: true,
      role: UserRole.ADMIN,
    };

    const response = await sut.execute(categoryData);

    expect(response.isRight()).toBe(true);
    const category = inMemoryCategoryRepository.categories[0];
    expect(category.slug.getValue()).toBe('category-1');
  });
});
