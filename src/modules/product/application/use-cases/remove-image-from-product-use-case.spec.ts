import { makeFakeProduct } from '../../test/factories/make-fake-product';
import { InMemoryProductRepository } from './../../test/repositories/in-memory-product-repository';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { RemoveImageFromProductUseCase } from './remove-image-from-product.use-case';
import { InMemoryImageRepository } from '../../test/repositories/in-memory-image.repository';
import { makeFakeImage } from '../../test/factories/make-fake-image';

let sut: RemoveImageFromProductUseCase;
let inMemoryProductRepository: InMemoryProductRepository;
let inMemoryImageRepository: InMemoryImageRepository;

describe('RemoveImageFromProductUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    inMemoryImageRepository = new InMemoryImageRepository();
    sut = new RemoveImageFromProductUseCase(
      inMemoryProductRepository,
      inMemoryImageRepository,
    );
  });
  it('should remove an image from a product', async () => {
    const image = makeFakeImage();
    const image2 = makeFakeImage();
    await inMemoryImageRepository.create(image);
    await inMemoryImageRepository.create(image2);
    const newProduct = makeFakeProduct({
      imageIds: [image.id, image2.id],
    });
    await inMemoryProductRepository.create(newProduct);

    expect(inMemoryProductRepository.products[0].imageIds).toHaveLength(2);

    await sut.execute({
      productId: newProduct.id.toString(),
      imageIds: [image.id.toString()],
    });

    expect(inMemoryProductRepository.products[0].imageIds).toHaveLength(1);
    expect(inMemoryProductRepository.products[0].imageIds[0].toString()).toBe(
      image2.id.toString(),
    );
  });
  it("should throw if product doesn't exist", async () => {
    const result = await sut.execute({
      productId: 'non-existing-product-id',
      imageIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
  it('should remove multiple images from a product', async () => {
    const image1 = makeFakeImage();
    const image2 = makeFakeImage();
    const image3 = makeFakeImage();
    await inMemoryImageRepository.create(image1);
    await inMemoryImageRepository.create(image2);
    await inMemoryImageRepository.create(image3);

    const newProduct = makeFakeProduct({
      imageIds: [image1.id, image2.id, image3.id],
    });
    await inMemoryProductRepository.create(newProduct);

    expect(inMemoryProductRepository.products[0].imageIds).toHaveLength(3);

    await sut.execute({
      productId: newProduct.id.toString(),
      imageIds: [image1.id.toString(), image2.id.toString()],
    });

    expect(inMemoryProductRepository.products[0].imageIds).toHaveLength(1);
    expect(inMemoryProductRepository.products[0].imageIds[0].toString()).toBe(
      image3.id.toString(),
    );
  });
  it('should throw if image to remove does not exist', async () => {
    const newProduct = makeFakeProduct();
    await inMemoryProductRepository.create(newProduct);

    const result = await sut.execute({
      productId: newProduct.id.toString(),
      imageIds: ['id-not-existing'],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
