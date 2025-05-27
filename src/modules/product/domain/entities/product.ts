import { Entity } from 'src/lib/common/entities/entity';
import { Price } from '../value-objects/price';
import { Id } from 'src/lib/common/entities/id';
import { ProductImage } from './product-image';
import { Stock } from '../value-objects/stock';

export interface ProductProps {
  name: string;
  description: string;
  price: Price;
  stock: Stock;
  categoryIds: Id[];
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
  get currentPrice() {
    return this.props.price.getPriceWithDiscount();
  }
  get originalPrice() {
    return this.props.price.getOriginalPrice();
  }
  get discount() {
    return this.props.price.getDiscount();
  }
  get name() {
    return this.props.name;
  }
  get getStock() {
    return this.props.stock.getQuantity();
  }
  get description() {
    return this.props.description;
  }
  get images() {
    return this.props.images;
  }
  get categoryIds() {
    return this.props.categoryIds;
  }
  updateStock(newStock: Stock) {
    this.props.stock.updateQuantity(newStock.getQuantity());
  }
  updateDescription(description: string) {
    this.props.description = description;
    this.updateTimestamp();
  }
  updateName(name: string) {
    this.props.name = name;
    this.updateTimestamp();
  }
  updatePrice(price: Price) {
    this.props.price = price;
    this.updateTimestamp();
  }
  applyDiscount(discount: number) {
    this.props.price = this.props.price.applyDiscount(discount);
    this.updateTimestamp();
  }
  addImages(images: ProductImage[]) {
    const currentImageIds = new Set(this.props.images.map((image) => image.id));

    images.forEach((image) => {
      if (!currentImageIds.has(image.id)) {
        this.props.images.push(image);
        currentImageIds.add(image.id);
      }
    });
    this.updateTimestamp();
  }

  removeImages(imageIds: Id[]) {
    this.props.images = this.props.images.filter(
      (image) => !imageIds.some((imageId) => image.id.equals(imageId)),
    );

    this.updateTimestamp();
  }

  addCategoriesToProduct(categoryIds: Id[]) {
    const currentCategoryIds = new Set(
      this.props.categoryIds.map((category) => category.toString()),
    );

    categoryIds.forEach((categoryId) => {
      if (!currentCategoryIds.has(categoryId.toString())) {
        this.props.categoryIds.push(categoryId);
        currentCategoryIds.add(categoryId.toString());
      }
    });

    this.updateTimestamp();
  }

  removeCategoriesFromProduct(categoryIds: Id[]) {
    this.props.categoryIds = this.props.categoryIds.filter(
      (categoryId) => !categoryIds.some((id) => categoryId.equals(id)),
    );
    this.updateTimestamp();
  }
}
