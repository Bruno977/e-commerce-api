import { Product } from '../entities/product';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract findById(id: string): Promise<Product | null>;
}
