import { Either, left, right } from 'src/lib/common/either/either';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ICreateProduct } from '../interfaces/create-product';
import { NotAllowedError } from 'src/lib/common/errors/not-allowed.error';
import { Price } from '../../domain/value-objects/price';
import { ProductImage } from '../../domain/value-objects/product-image';
import { Product } from '../../domain/entities/product';
import { CategoryRepository } from 'src/modules/category/domain/repositories/category.repository';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';

type ResponseCreateProductUseCase = Promise<
  Either<
    NotAllowedError,
    {
      product: Product;
    }
  >
>;

export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
  ) {}
  async execute({
    name,
    description,
    categoryIds,
    images,
    price,
    stock,
    discount,
  }: ICreateProduct): Promise<ResponseCreateProductUseCase> {
    const existsCategories =
      await this.categoryRepository.findByIds(categoryIds);
    if (!existsCategories) {
      return left(new ResourceNotFoundError('Category not found'));
    }
    const productImages: ProductImage[] = images.map(
      (image) => new ProductImage(image.path, image.alt),
    );

    const newProduct = Product.create({
      name,
      description,
      categoryIds,
      originalPrice: new Price(price),
      price: new Price(price),
      imagePaths: productImages,
      discount: null,
      stock,
    });

    if (discount) {
      newProduct.applyDiscount(discount);
    }

    const product = await this.productRepository.create(newProduct);

    return right({ product });
  }
}
