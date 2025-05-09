import { InMemoryProductRepository } from './../../test/repositories/in-memory-product-repository';
import { CreateProductUseCase } from './create-product-use-case';
import { makeFakeProductData } from '../../test/factories/make-fake-product';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { InMemoryCategoryRepository } from 'src/modules/category/test/repositories/in-memory-category.repository';
import { makeFakeCategory } from 'src/modules/category/test/factories/make-fake-category';

let sut: CreateProductUseCase;
let inMemoryProductRepository: InMemoryProductRepository;
let inMemoryCategoryRepository: InMemoryCategoryRepository;
describe('CreateProductUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new CreateProductUseCase(
      inMemoryProductRepository,
      inMemoryCategoryRepository,
    );
  });
  it('should create a product', async () => {
    const newCategory = makeFakeCategory();
    await inMemoryCategoryRepository.create(newCategory);

    const newProduct = makeFakeProductData({
      price: 80,
      categoryIds: [newCategory.id.value],
    });

    const expectedPrice =
      newProduct.price - (newProduct.price * (newProduct.discount ?? 0)) / 100;

    const result = await sut.execute(newProduct);
    expect(result.isRight()).toBe(true);

    const product = inMemoryProductRepository.products[0];
    expect(product.name).toBe(newProduct.name);
    expect(product.description).toBe(newProduct.description);
    expect(product.originalPrice).toBe(newProduct.price);
    expect(product.currentPrice).toBe(expectedPrice);
    expect(product.stock).toBe(newProduct.stock);
    expect(product.discount).toBe(newProduct.discount);
    expect(product.images[0].imagePath).toBe(newProduct.images[0].path);
    expect(product.images[0].altText).toBe(newProduct.images[0].alt);
    expect(product.categoriesIds).toEqual(newProduct.categoryIds);
  });
  it('should not create a product if not exists category', async () => {
    const newProduct = makeFakeProductData();
    const result = await sut.execute(newProduct);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
