import { Either, left, right } from 'src/lib/common/either/either';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { Product } from '../../domain/entities/product';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { CategoryRepository } from 'src/modules/category/domain/repositories/category.repository';
import { IAddCategoryToProduct } from '../interfaces/add-category-to-product';

type ResponseAddCategoryToProductUseCase = Promise<
  Either<ResourceNotFoundError, { product: Product }>
>;

export class AddCategoryToProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute({
    productId,
    categoryId,
  }: IAddCategoryToProduct): ResponseAddCategoryToProductUseCase {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      return left(new ResourceNotFoundError(`Product not found`));
    }

    const categoryExists = await this.categoryRepository.findById(categoryId);
    if (!categoryExists) {
      return left(new ResourceNotFoundError(`Category not found`));
    }
    product.addCategoryToProduct(categoryId);

    await this.productRepository.update(product);

    return right({ product });
  }
}
