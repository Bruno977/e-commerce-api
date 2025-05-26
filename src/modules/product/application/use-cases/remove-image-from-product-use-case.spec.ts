import { makeFakeProduct } from '../../test/factories/make-fake-product';
import { InMemoryProductRepository } from './../../test/repositories/in-memory-product-repository';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { RemoveImageFromProductUseCase } from './remove-image-from-product.use-case';
import { ProductImage } from '../../domain/entities/product-image';
let sut: RemoveImageFromProductUseCase;
let inMemoryProductRepository: InMemoryProductRepository;

describe('RemoveImageFromProductUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new RemoveImageFromProductUseCase(inMemoryProductRepository);
  });
  it('should remove an image from a product', async () => {
    const image1 = ProductImage.create({
      alt: 'Image 1',
      path: '/images/image1.jpg',
    });
    const newProduct = makeFakeProduct({
      images: [
        image1,
        ProductImage.create({
          alt: 'Image 2',
          path: '/images/image2.jpg',
        }),
      ],
    });
    await inMemoryProductRepository.create(newProduct);

    expect(inMemoryProductRepository.products[0].images).toHaveLength(2);

    await sut.execute({
      productId: newProduct.id.toString(),
      imageIds: [image1.id.toString()],
    });

    expect(inMemoryProductRepository.products[0].images).toHaveLength(1);
    expect(inMemoryProductRepository.products[0].images[0].path).toBe(
      '/images/image2.jpg',
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
    const image1 = ProductImage.create({
      alt: 'Image 2',
      path: '/images/image2.jpg',
    });
    const image2 = ProductImage.create({
      alt: 'Image 2',
      path: '/images/image2.jpg',
    });
    const newProduct = makeFakeProduct({
      images: [
        image1,
        image2,
        ProductImage.create({
          alt: 'Image 3',
          path: '/images/image3.jpg',
        }),
      ],
    });
    await inMemoryProductRepository.create(newProduct);

    expect(inMemoryProductRepository.products[0].images).toHaveLength(3);

    await sut.execute({
      productId: newProduct.id.toString(),
      imageIds: [image1.id.toString(), image2.id.toString()],
    });

    expect(inMemoryProductRepository.products[0].images).toHaveLength(1);
    expect(inMemoryProductRepository.products[0].images[0].path).toBe(
      '/images/image3.jpg',
    );
  });
  // it('should throw if image to remove does not exist', async () => {
  //   const newProduct = makeFakeProduct();
  //   await inMemoryProductRepository.create(newProduct);

  //   expect(inMemoryProductRepository.products[0].images).toHaveLength(2);

  //   const result = await sut.execute({
  //     productId: newProduct.id.toString(),
  //     imageIds: ['id-not-existing'],
  //   });

  //   expect(result.isLeft()).toBe(true);
  //   expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  // });
});
