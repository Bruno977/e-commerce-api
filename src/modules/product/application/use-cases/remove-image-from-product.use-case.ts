import { IRemoveImageFromProduct } from './../interfaces/remove-image-from-product';
import { Either, left, right } from 'src/lib/common/either/either';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Id } from 'src/lib/common/entities/id';

type ResponseRemoveImageFromProduct = Promise<
  Either<ResourceNotFoundError, null>
>;

export class RemoveImageFromProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
    imageIds,
  }: IRemoveImageFromProduct): ResponseRemoveImageFromProduct {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      return left(new ResourceNotFoundError(`Product not found`));
    }
    const images = imageIds.map((imageId) => Id.create(imageId.toString()));

    product.removeImages(images);

    await this.productRepository.update(product);

    return right(null);
  }
}
