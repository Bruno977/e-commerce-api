import { Either, left, right } from 'src/lib/common/either/either';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { IAddImageToProduct } from '../interfaces/add-image-to-product';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ImageRepository } from '../../domain/repositories/image.repository';

type ResponseAddImageUseCase = Promise<Either<ResourceNotFoundError, null>>;

export class AddImageUseCase {
  constructor(
    private productRepository: ProductRepository,
    private imageRepository: ImageRepository,
  ) {}
  async execute({
    productId,
    imageIds,
  }: IAddImageToProduct): ResponseAddImageUseCase {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      return left(new ResourceNotFoundError('Product not found'));
    }

    const imagesToAdd = await this.imageRepository.findByIds(imageIds);

    if (imagesToAdd.length === 0) {
      return left(
        new ResourceNotFoundError('No images found for the provided IDs'),
      );
    }

    const images = imagesToAdd.map((image) => image.id);

    product.addImages(images);

    await this.productRepository.update(product);

    return right(null);
  }
}
