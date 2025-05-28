import { Entity } from 'src/lib/common/entities/entity';
import { Price } from '../value-objects/price';
import { Id } from 'src/lib/common/entities/id';
import { Stock } from '../value-objects/stock';
import { Optional } from 'src/lib/common/types/optional';

export interface ProductProps {
  name: string;
  description: string;
  price: Price;
  stock: Stock;
  categoryIds: Id[];
  imageIds: Id[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Product extends Entity<ProductProps> {
  static create(
    props: Optional<
      ProductProps,
      'imageIds' | 'createdAt' | 'updatedAt' | 'isActive'
    >,
    id?: Id,
  ) {
    const now = new Date();
    return new Product(
      {
        ...props,
        imageIds: props.imageIds ?? [],
        isActive: props.isActive ?? true,
        createdAt: now,
        updatedAt: now,
      },
      id,
    );
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
  get imageIds() {
    return this.props.imageIds;
  }
  get categoryIds() {
    return this.props.categoryIds;
  }
  get isActive() {
    return this.props.isActive;
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
  addImages(imageIds: Id[]) {
    const currentImageIds = new Set(
      this.props.imageIds.map((image) => image.toString()),
    );

    imageIds.forEach((imageId) => {
      if (!currentImageIds.has(imageId.toString())) {
        this.props.imageIds.push(imageId);
        currentImageIds.add(imageId.toString());
      }
    });
    this.updateTimestamp();
  }

  removeImages(imageIds: Id[]) {
    this.props.imageIds = this.props.imageIds.filter(
      (imageId) => !imageIds.some((id) => imageId.equals(id)),
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
