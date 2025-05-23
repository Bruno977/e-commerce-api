import { Product } from '../entities/product';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findByIds(ids: string[]): Promise<Product[] | null>;
  abstract findByCategoryId(categoryId: string): Promise<Product[] | null>;
  abstract findAll(): Promise<Product[]>;
  abstract remove(productId: string): Promise<void>;
  abstract update(product: Product): Promise<void>;
}
