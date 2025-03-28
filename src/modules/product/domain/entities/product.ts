import { Entity } from 'src/lib/common/entities/entity';

interface ProductProps {
  name: string;
  description: string;
  price: number;
  discount?: number | null;
  stock: number;
  categoryId: string;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }
  get description() {
    return this.props.description;
  }
  set description(description: string) {
    this.props.description = description;
  }
  get price() {
    return this.props.price;
  }
  set price(price: number) {
    this.props.price = price;
  }
  get discount(): number | null | undefined {
    return this.props.discount;
  }
  set discount(discount: number) {
    this.props.discount = discount;
  }
  get stock() {
    return this.props.stock;
  }
  set stock(stock: number) {
    this.props.stock = stock;
  }
  get categoryId() {
    return this.props.categoryId;
  }
  set categoryId(categoryId: string) {
    this.props.categoryId = categoryId;
  }
  get imageUrls() {
    return this.props.imageUrls;
  }
  set imageUrls(imageUrls: string[]) {
    this.props.imageUrls = imageUrls;
  }
  static create(props: ProductProps) {
    const now = new Date();
    const id = crypto.randomUUID();
    return new Product(id, {
      ...props,
      createdAt: now,
      updatedAt: now,
    });
  }
}
