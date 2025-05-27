import { faker } from '@faker-js/faker/.';
import { Product, ProductProps } from '../../domain/entities/product';
import { Price } from '../../domain/value-objects/price';
import { ICreateProduct } from '../../application/interfaces/create-product';
import { ProductImage } from '../../domain/entities/product-image';
import { Stock } from '../../domain/value-objects/stock';
import { Id } from 'src/lib/common/entities/id';

export function makeFakeProduct(override: Partial<ProductProps> = {}) {
  const newProduct = Product.create({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Price.createWithDiscount(
      parseFloat(faker.commerce.price()),
      faker.number.int({ min: 0, max: 100 }),
    ),
    stock: new Stock(faker.number.int({ min: 0, max: 100 })),
    images: [
      ProductImage.create({
        alt: faker.commerce.productName(),
        path: faker.image.url(),
      }),
    ],
    categoryIds: [Id.create(faker.string.uuid())],
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...override,
  });
  return newProduct;
}
export function makeFakeProductData(
  override: Partial<ICreateProduct> = {},
): ICreateProduct {
  const product = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    discount: faker.number.int({ min: 1, max: 100 }),
    stock: faker.number.int({ min: 0, max: 100 }),
    images: [
      {
        path: faker.image.url(),
        alt: faker.commerce.productName(),
      },
    ],
    categoryIds: [faker.string.uuid()],
    ...override,
  };
  return product;
}
