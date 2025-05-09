import { InMemoryCategoryRepository } from '../../../category/test/repositories/in-memory-category.repository';
import { makeFakeProduct } from '../../test/factories/make-fake-product';
import { InMemoryProductRepository } from '../../test/repositories/in-memory-product-repository';
import { makeFakeCategory } from 'src/modules/category/test/factories/make-fake-category';
import { AddCategoryToProductUseCase } from './add-category-to-product.use-case';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';

let sut: AddCategoryToProductUseCase;
let inMemoryProductRepository: InMemoryProductRepository;
let inMemoryCategoryRepository: InMemoryCategoryRepository;

describe('AddCategoryToProductUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new AddCategoryToProductUseCase(
      inMemoryProductRepository,
      inMemoryCategoryRepository,
    );
  });

  it('should be able to add new category in use case', async () => {
    const newCategory =
      await inMemoryCategoryRepository.create(makeFakeCategory());
    const newCategory2 =
      await inMemoryCategoryRepository.create(makeFakeCategory());

    const newProduct = await inMemoryProductRepository.create(
      makeFakeProduct({
        categoryIds: [newCategory.id.toString(), newCategory2.id.toString()],
      }),
    );

    const newCategory3 = await inMemoryCategoryRepository.create(
      makeFakeCategory({
        title: 'New Category',
      }),
    );

    await sut.execute({
      productId: newProduct.id.toString(),
      categoryId: newCategory3.id.toString(),
    });
    const product = inMemoryProductRepository.products[0];

    expect(product.categoriesIds).toContain(newCategory3.id.toString());
    expect(product.categoriesIds).toContain(newCategory2.id.toString());
    expect(product.categoriesIds).toContain(newCategory.id.toString());
  });
  it("should not be able to add a category to a product that doesn't exist", async () => {
    const newCategory =
      await inMemoryCategoryRepository.create(makeFakeCategory());

    const result = await sut.execute({
      productId: 'non-existing-product-id',
      categoryId: newCategory.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
  it("should not be able to add a category that doesn't exist", async () => {
    const newProduct =
      await inMemoryProductRepository.create(makeFakeProduct());

    const result = await sut.execute({
      productId: newProduct.id.toString(),
      categoryId: 'non-existing-category-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
