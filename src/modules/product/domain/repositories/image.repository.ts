import { ProductImage } from '../entities/product-image';

export abstract class ImageRepository {
  abstract create(image: ProductImage): Promise<void>;
  abstract createMany(images: ProductImage[]): Promise<void>;
  abstract findById(id: string): Promise<ProductImage | null>;
  abstract findByIds(ids: string[]): Promise<ProductImage[]>;
  abstract delete(id: string): Promise<void>;
  abstract deleteMany(ids: string[]): Promise<void>;
}
