import { IRemoveImageFromProduct } from './../interfaces/remove-image-from-product';
import { Either, left, right } from 'src/lib/common/either/either';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { ProductRepository } from '../../domain/repositories/product.repository';

type ResponseRemoveImageFromProduct = Promise<
  Either<ResourceNotFoundError, null>
>;

export class RemoveImageFromProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
    imagePaths,
  }: IRemoveImageFromProduct): ResponseRemoveImageFromProduct {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      return left(new ResourceNotFoundError(`Product not found`));
    }

    const result = product.removeImages(imagePaths);

    if (result.isLeft()) {
      return left(result.value);
    }

    await this.productRepository.update(product);

    return right(null);
  }
}
