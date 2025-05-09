import { Either, left, right } from 'src/lib/common/either/either';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { CategoryRepository } from 'src/modules/category/domain/repositories/category.repository';
import { IRemoveCategoryFromProduct } from '../interfaces/remove-category-from-product';

type ResponseRemoveCategoryFromProductUseCase = Promise<
  Either<ResourceNotFoundError, null>
>;

export class RemoveCategoryFromProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute({
    productId,
    categoryId,
  }: IRemoveCategoryFromProduct): ResponseRemoveCategoryFromProductUseCase {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      return left(new ResourceNotFoundError('Product not found'));
    }

    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      return left(new ResourceNotFoundError('Category not found'));
    }

    product.removeCategoryFromProduct(category.id.toString());

    await this.productRepository.update(product);

    return right(null);
  }
}
