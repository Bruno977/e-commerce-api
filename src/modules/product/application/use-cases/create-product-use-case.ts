import { Either, left, right } from 'src/lib/common/either/either';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ICreateProduct } from '../interfaces/create-product';
import { NotAllowedError } from 'src/lib/common/errors/not-allowed.error';
import { Price } from '../../domain/value-objects/price';
import { Product } from '../../domain/entities/product';
import { CategoryRepository } from 'src/modules/category/domain/repositories/category.repository';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { Injectable } from '@nestjs/common';

type ResponseCreateProductUseCase = Promise<Either<NotAllowedError, null>>;

@Injectable()
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

    const newProduct = Product.create({
      name,
      description,
      categoryIds,
      originalPrice: new Price(price),
      price: new Price(price),
      imagePaths: [],
      discount: null,
      stock,
    });
    newProduct.addImages(images);

    if (discount) {
      newProduct.applyDiscount(discount);
    }
    await this.productRepository.create(newProduct);

    return right(null);
  }
}
