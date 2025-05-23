import { Entity } from 'src/lib/common/entities/entity';
import { Price } from '../value-objects/price';
import { ProductImage } from '../value-objects/product-image';
import { left } from 'src/lib/common/either/either';
import { ProductCategory } from './product-category';
import { Id } from 'src/lib/common/entities/id';

export interface ProductProps {
  name: string;
  description: string;
  price: Price;
  originalPrice: Price;
  discount?: number | null;
  stock: number;
  categories: ProductCategory[];
  images: ProductImage[];
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
  get images() {
    return this.props.images;
  }
  get categories() {
    return this.props.categories;
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
  addImages(images: ProductImage[]) {
    const currentImagePaths = new Set(
      this.props.images.map((image) => image.path),
    );

    images.forEach((image) => {
      if (!currentImagePaths.has(image.path)) {
        this.props.images.push(image);
        currentImagePaths.add(image.path);
      }
    });
    this.updateTimestamp();
  }
  removeImages(imagesPaths: string[]) {
    this.props.images = this.props.images.filter(
      (image) => !imagesPaths.includes(image.path),
    );

    this.updateTimestamp();
  }

  addCategoriesToProduct(categories: ProductCategory[]) {
    const currentCategoryIds = new Set(
      this.props.categories.map((category) => category.id.toString()),
    );

    categories.forEach((category) => {
      if (!currentCategoryIds.has(category.id.toString())) {
        this.props.categories.push(category);
        currentCategoryIds.add(category.id.toString());
      }
    });
    this.updateTimestamp();
  }

  removeCategoriesFromProduct(categoryIds: Id[]) {
    this.props.categories = this.props.categories.filter(
      (categoryToRemove) =>
        !categoryIds.some(
          (categoryId) =>
            categoryId.toString() === categoryToRemove.id.toString(),
        ),
    );
    this.updateTimestamp();
  }
}
