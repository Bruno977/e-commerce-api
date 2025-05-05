import { Product } from '../../domain/entities/product';
import { ProductRepository } from '../../domain/repositories/product.repository';

export class InMemoryProductRepository implements ProductRepository {
  public products: Product[] = [];

  async create(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      return null;
    }
    return product;
  }
}
