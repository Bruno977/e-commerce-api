import { Either, right } from 'src/lib/common/either/either';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product';
import { Injectable } from '@nestjs/common';

type ResponseFindAllProductsUseCase = Promise<
  Either<null, { products: Product[] }>
>;
@Injectable()
export class FindAllProductsUseCase {
  constructor(private productRepository: ProductRepository) {}
  async execute(): ResponseFindAllProductsUseCase {
    const products = await this.productRepository.findAll();
    return right({
      products,
    });
  }
}
