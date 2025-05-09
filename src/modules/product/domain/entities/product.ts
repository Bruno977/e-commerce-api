import { Entity } from 'src/lib/common/entities/entity';
import { Price } from '../value-objects/price';
import { ProductImage } from '../value-objects/product-image';
import { left } from 'src/lib/common/either/either';

export interface ProductProps {
  name: string;
  description: string;
  price: Price;
  originalPrice: Price;
  discount?: number | null;
  stock: number;
  categoryIds: string[];
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
  get originalPrice() {
    return this.props.originalPrice.amount;
  }
  get currentPrice() {
    return this.props.price.amount;
  }
  get stock() {
    return this.props.stock;
  }
  get discount() {
    return this.props.discount;
  }
  get name() {
    return this.props.name;
  }
  get description() {
    return this.props.description;
  }
  get categoriesIds() {
    return this.props.categoryIds;
  }
  get images() {
    return this.props.imagePaths;
  }
  updateDescription(description: string) {
    this.props.description = description;
    this.updateTimestamp();
  }
  updateName(name: string) {
    this.props.name = name;
    this.updateTimestamp();
  }
  updateOriginalPrice(price: number) {
    this.props.originalPrice = new Price(price);
    this.updateTimestamp();
  }
  updatePrice(price: number) {
    this.props.price = new Price(price);
    this.updateTimestamp();
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
      return left(new Error('Stock cannot be negative.'));
    }
    this.props.stock = stock;
    this.updateTimestamp();
  }
  addImage(image: ProductImage) {
    const exists = this.props.imagePaths.some(
      (img) => img.imagePath === image.imagePath,
    );
    if (exists) {
      return left(new Error('Image with the same URL already exists.'));
    }
    this.props.imagePaths.push(image);
    this.updateTimestamp();
  }
  removeImage(imagePath: string) {
    const index = this.props.imagePaths.findIndex(
      (img) => img.imagePath === imagePath,
    );
    if (index === -1) {
      return left(new Error('Image not found.'));
    }
    this.props.imagePaths.splice(index, 1);
    this.updateTimestamp();
  }

  addCategory(categoryId: string) {
    if (this.props.categoryIds.includes(categoryId)) {
      return left(new Error('Category already associated with this product.'));
    }
    this.props.categoryIds.push(categoryId);
    this.updateTimestamp();
  }

  removeCategory(categoryId: string) {
    const index = this.props.categoryIds.indexOf(categoryId);
    if (index === -1) {
      return left(new Error('Category not associated with this product.'));
    }
    this.props.categoryIds.splice(index, 1);
    this.updateTimestamp();
  }
}
