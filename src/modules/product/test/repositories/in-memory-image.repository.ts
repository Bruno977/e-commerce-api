import { ProductImage } from '../../domain/entities/product-image';
import { ImageRepository } from '../../domain/repositories/image.repository';

export class InMemoryImageRepository implements ImageRepository {
  public images: ProductImage[] = [];

  async create(image: ProductImage) {
    this.images.push(image);
  }
  async createMany(images: ProductImage[]) {
    this.images.push(...images);
  }
  async findById(id: string) {
    const image = this.images.find((image) => image.id.toString() === id);
    if (!image) {
      return null;
    }
    return image;
  }
  async findByIds(ids: string[]) {
    const images = this.images.filter((image) =>
      ids.includes(image.id.toString()),
    );
    if (!images) {
      return [];
    }
    return images;
  }
  async delete(id: string): Promise<void> {
    const index = this.images.findIndex((image) => image.id.toString() === id);
    if (index !== -1) {
      this.images.splice(index, 1);
    }
  }
  async deleteMany(ids: string[]) {
    this.images = this.images.filter(
      (image) => !ids.includes(image.id.toString()),
    );
  }
}
