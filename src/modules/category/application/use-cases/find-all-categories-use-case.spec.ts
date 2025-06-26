import { makeFakeCategory } from '../../test/factories/make-fake-category';
import { InMemoryCategoryRepository } from '../../test/repositories/in-memory-category.repository';
import { FindAllCategoriesUseCase } from './find-all-categories.use-case';

let sut: FindAllCategoriesUseCase;
let inMemoryCategoryRepository: InMemoryCategoryRepository;

describe('FindAllCategoriesUseCase', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new FindAllCategoriesUseCase(inMemoryCategoryRepository);
  });
  it('should be able to find all categories', async () => {
    await inMemoryCategoryRepository.create(makeFakeCategory());
    await inMemoryCategoryRepository.create(makeFakeCategory());
    await inMemoryCategoryRepository.create(makeFakeCategory());
    await inMemoryCategoryRepository.create(makeFakeCategory());

    const result = await sut.execute();
    expect(result.value?.categories).toHaveLength(4);
  });
});
