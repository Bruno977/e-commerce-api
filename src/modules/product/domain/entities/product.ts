import { Entity } from 'src/lib/common/entities/entity';
import { Price } from '../value-objects/price';
import { ProductImage } from '../value-objects/product-image';
import { Either, left, right } from 'src/lib/common/either/either';
import { ImageProps } from '../../application/interfaces/create-product';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';

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
  addImages(images: ImageProps[]) {
    images.forEach((image) => {
      this.props.imagePaths.push(new ProductImage(image.path, image.alt));
    });
    this.updateTimestamp();
  }
  removeImages(imagesPaths: string[]): Either<ResourceNotFoundError, void> {
    const notFoundImages = imagesPaths.filter(
      (imageToRemove) =>
        !this.props.imagePaths.some(
          (image) => image.imagePath === imageToRemove,
        ),
    );

    if (notFoundImages.length > 0) {
      return left(
        new ResourceNotFoundError(
          `Images not found: ${notFoundImages.join(', ')}`,
        ),
      );
    }

    this.props.imagePaths = this.props.imagePaths.filter(
      (image) => !imagesPaths.includes(image.imagePath),
    );

    this.updateTimestamp();
    return right(undefined);
  }

  addCategoryToProduct(categoryId: string) {
    if (this.props.categoryIds.includes(categoryId)) {
      return left(new Error('Category already associated with this product.'));
    }
    this.props.categoryIds.push(categoryId);
    this.updateTimestamp();
  }

  removeCategoryFromProduct(categoryId: string) {
    const index = this.props.categoryIds.indexOf(categoryId);
    if (index === -1) {
      return left(new Error('Category not associated with this product.'));
    }
    this.props.categoryIds.splice(index, 1);
    this.updateTimestamp();
  }
}
