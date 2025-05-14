import { makeFakeProduct } from 'src/modules/product/test/factories/make-fake-product';
import { InMemoryProductRepository } from '../../test/repositories/in-memory-product-repository';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { AddImageUseCase } from './add-image.use-case';

let sut: AddImageUseCase;
let inMemoryProductRepository: InMemoryProductRepository;
describe('AddImageUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new AddImageUseCase(inMemoryProductRepository);
  });
  it('should be able to add an image to a product', async () => {
    const newProduct = makeFakeProduct();
    await inMemoryProductRepository.create(newProduct);
    await sut.execute({
      productId: newProduct.id.toString(),
      images: [
        {
          path: 'image1.png',
          alt: 'Image 1',
        },
        {
          path: 'image2.png',
          alt: 'Image 2',
        },
      ],
    });
    const product = inMemoryProductRepository.products[0];
    expect(product.images).toHaveLength(3);
    expect(product.images[1].imagePath).toBe('image1.png');
    expect(product.images[1].altText).toBe('Image 1');
    expect(product.images[2].imagePath).toBe('image2.png');
    expect(product.images[2].altText).toBe('Image 2');
  });
  it('should not be able to add an image to a product that does not exist', async () => {
    const result = await sut.execute({
      productId: 'non-existing-product-id',
      images: [
        {
          path: 'image1.png',
          alt: 'Image 1',
        },
        {
          path: 'image2.png',
          alt: 'Image 2',
        },
      ],
    });
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
