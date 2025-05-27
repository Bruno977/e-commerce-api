import { makeFakeProduct } from 'src/modules/product/test/factories/make-fake-product';
import { InMemoryProductRepository } from '../../test/repositories/in-memory-product-repository';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { AddImageUseCase } from './add-image-to-product.use-case';
import { InMemoryImageRepository } from '../../test/repositories/in-memory-image.repository';
import { makeFakeImage } from '../../test/factories/make-fake-image';

let sut: AddImageUseCase;
let inMemoryProductRepository: InMemoryProductRepository;
let inMemoryImageRepository: InMemoryImageRepository;

describe('AddImageUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    inMemoryImageRepository = new InMemoryImageRepository();
    sut = new AddImageUseCase(
      inMemoryProductRepository,
      inMemoryImageRepository,
    );
  });
  it('should be able to add an image to a product', async () => {
    const newProduct = makeFakeProduct({
      imageIds: [],
    });
    const newImage = makeFakeImage();
    const newImage2 = makeFakeImage();
    await inMemoryProductRepository.create(newProduct);
    await inMemoryImageRepository.create(newImage);
    await inMemoryImageRepository.create(newImage2);
    await sut.execute({
      productId: newProduct.id.toString(),
      imageIds: [newImage.id.toString(), newImage2.id.toString()],
    });
    const product = inMemoryProductRepository.products[0];
    expect(product.imageIds).toHaveLength(2);
  });

  it('should not be able to add an image to a product that does not exist', async () => {
    const result = await sut.execute({
      productId: 'non-existing-product-id',
      imageIds: ['non-existing-image-id'],
    });
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
  it("should not be able to add an image to a product if the image doesn't exist", async () => {
    const newProduct = makeFakeProduct();
    await inMemoryProductRepository.create(newProduct);
    const result = await sut.execute({
      productId: newProduct.id.toString(),
      imageIds: ['non-existing-image-id'],
    });
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
