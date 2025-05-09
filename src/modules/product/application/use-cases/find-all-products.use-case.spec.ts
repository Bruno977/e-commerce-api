import { makeFakeProduct } from '../../test/factories/make-fake-product';
import { InMemoryProductRepository } from './../../test/repositories/in-memory-product-repository';
import { FindAllProductsUseCase } from './find-all-products.use-case';
let sut: FindAllProductsUseCase;
let inMemoryProductRepository: InMemoryProductRepository;

describe('FindAllProductsUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new FindAllProductsUseCase(inMemoryProductRepository);
  });
  it('should be able to find all products', async () => {
    await inMemoryProductRepository.create(makeFakeProduct());
    await inMemoryProductRepository.create(makeFakeProduct());
    await inMemoryProductRepository.create(makeFakeProduct());
    await inMemoryProductRepository.create(makeFakeProduct());

    const products = await sut.execute();
    expect(products.value?.products).toHaveLength(4);
  });
  it('should return an empty array if no products are found', async () => {
    const products = await sut.execute();
    expect(products.value?.products).toHaveLength(0);
  });
});
