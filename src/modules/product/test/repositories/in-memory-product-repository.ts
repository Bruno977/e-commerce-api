import { Product } from '../../domain/entities/product';
import { ProductRepository } from '../../domain/repositories/product.repository';

export class InMemoryProductRepository implements ProductRepository {
  public products: Product[] = [];

  async create(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id.value === id);
    if (!product) {
      return null;
    }
    return product;
  }
  async findByCategoryId(categoryId: string): Promise<Product[] | null> {
    const products = this.products.filter((product) =>
      product.categoriesIds.includes(categoryId),
    );
    if (!products) {
      return null;
    }
    return products;
  }
  async findAll(): Promise<Product[]> {
    return this.products;
  }
}
