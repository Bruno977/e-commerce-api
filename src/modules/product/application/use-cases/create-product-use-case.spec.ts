import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { CreateProductUseCase } from './create-product-use-case';
import { InMemoryProductRepository } from '../../test/repositories/in-memory-product-repository';

let sut: CreateProductUseCase;
let inMemoryProductRepository: InMemoryProductRepository;
describe('CreateProductUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new CreateProductUseCase(inMemoryProductRepository);
  });
  it('should create a product', async () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      categoryId: '123',
      images: [{ path: 'image.jpg', alt: 'Test Image' }],
      originalPrice: 100,
      price: 80,
      stock: 10,
      discount: 20,
      role: UserRole.ADMIN,
    };

    const result = await sut.execute(productData);
    expect(result.isRight()).toBe(true);

    const product = inMemoryProductRepository.products[0];
    expect(product.name).toBe(productData.name);
  });
});
