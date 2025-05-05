import { Either, left, right } from 'src/lib/common/either/either';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ICreateProduct } from '../interfaces/create-product';
import { NotAllowedError } from 'src/lib/common/errors/not-allowed.error';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { Price } from '../../domain/value-objects/price';
import { ProductImage } from '../../domain/value-objects/product-image';
import { Product } from '../../domain/entities/product';

type ResponseCreateProductUseCase = Promise<
  Either<
    NotAllowedError,
    {
      product: Product;
    }
  >
>;

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}
  async execute({
    name,
    description,
    categoryId,
    images,
    originalPrice,
    price,
    stock,
    discount,
    role,
  }: ICreateProduct): Promise<ResponseCreateProductUseCase> {
    if (role !== UserRole.ADMIN) {
      return left(new NotAllowedError('Only admin can create products'));
    }
    const productImages: ProductImage[] = images.map(
      (image) => new ProductImage(image.path, image.alt),
    );
    const newProduct = Product.create({
      name,
      description,
      categoryId,
      originalPrice: new Price(originalPrice),
      price: new Price(price),
      imagePaths: productImages,
      discount,
      stock,
    });

    const product = await this.productRepository.create(newProduct);

    return right({ product });
  }
}
