import { Entity } from 'src/lib/common/entities/entity';
import { Price } from '../value-objects/price';
import { ProductImage } from '../value-objects/product-image';

interface ProductProps {
  name: string;
  description: string;
  price: Price;
  originalPrice: Price;
  discount?: number | null;
  stock: number;
  categoryId: string;
  imagePaths: ProductImage[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product extends Entity<ProductProps> {
  static create(props: ProductProps) {
    const now = new Date();
    return new Product({
      ...props,
      createdAt: now,
      updatedAt: now,
    });
  }

  private updateTimestamp() {
    this.props.updatedAt = new Date();
  }

  applyDiscount(discount: number) {
    this.props.price = this.props.originalPrice.applyDiscount(discount);
    this.props.discount = discount;
    this.updateTimestamp();
  }
  removeDiscount() {
    this.props.price = this.props.originalPrice;
    this.props.discount = null;
    this.updateTimestamp();
  }
  updateStock(stock: number) {
    if (stock < 0) {
      throw new Error('Stock cannot be negative.');
    }
    this.props.stock = stock;
    this.updateTimestamp();
  }
  updateCategory(categoryId: string) {
    this.props.categoryId = categoryId;
    this.updateTimestamp();
  }
  addImage(image: ProductImage) {
    const exists = this.props.imagePaths.some(
      (img) => img.imagePath === image.imagePath,
    );
    if (exists) {
      throw new Error('Image with the same URL already exists.');
    }
    this.props.imagePaths.push(image);
    this.updateTimestamp();
  }
  removeImage(imagePath: string) {
    const index = this.props.imagePaths.findIndex(
      (img) => img.imagePath === imagePath,
    );
    if (index === -1) {
      throw new Error('Image not found.');
    }
    this.props.imagePaths.splice(index, 1);
    this.updateTimestamp();
  }
  get originalPrice() {
    return this.props.originalPrice.amount;
  }
  get discountedPrice() {
    return this.props.price.amount;
  }
  get name() {
    return this.props.name;
  }
}
