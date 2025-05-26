import { faker } from '@faker-js/faker/.';
import { Product, ProductProps } from '../../domain/entities/product';
import { Price } from '../../domain/value-objects/price';
import { ICreateProduct } from '../../application/interfaces/create-product';
import { ProductCategory } from '../../domain/entities/product-category';
import { ProductImage } from '../../domain/entities/product-image';

export function makeFakeProduct(override: Partial<ProductProps> = {}) {
  const newProduct = Product.create({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: new Price(parseFloat(faker.commerce.price())),
    discount: parseFloat(faker.commerce.price()),
    originalPrice: new Price(parseFloat(faker.commerce.price())),
    stock: faker.number.int({ min: 0, max: 100 }),
    images: [
      ProductImage.create({
        alt: faker.commerce.productName(),
        path: faker.image.url(),
      }),
    ],
    categories: [
      ProductCategory.create({
        title: faker.commerce.department(),
      }),
    ],
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
    categories: [
      {
        id: faker.string.uuid(),
        title: faker.commerce.department(),
      },
    ],
    ...override,
  };
  return product;
}
