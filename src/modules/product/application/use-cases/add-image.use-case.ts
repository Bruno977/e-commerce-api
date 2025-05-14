import { Either, left, right } from 'src/lib/common/either/either';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { IAddImageToProduct } from '../interfaces/add-image-to-product';
import { ProductRepository } from '../../domain/repositories/product.repository';

type ResponseAddImageUseCase = Promise<Either<ResourceNotFoundError, null>>;

export class AddImageUseCase {
  constructor(private productRepository: ProductRepository) {}
  async execute({
    productId,
    images,
  }: IAddImageToProduct): ResponseAddImageUseCase {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      return left(new ResourceNotFoundError('Product not found'));
    }

    product.addImages(images);

    await this.productRepository.update(product);

    return right(null);
  }
}
