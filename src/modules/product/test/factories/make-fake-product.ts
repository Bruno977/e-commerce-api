import { faker } from '@faker-js/faker/.';
import { Product, ProductProps } from '../../domain/entities/product';
import { Price } from '../../domain/value-objects/price';
import { ProductImage } from '../../domain/value-objects/product-image';

export function makeFakeProduct(override: Partial<ProductProps> = {}) {
  const newProduct = Product.create({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: new Price(parseFloat(faker.commerce.price())),
    discount: parseFloat(faker.commerce.price()),
    originalPrice: new Price(parseFloat(faker.commerce.price())),
    stock: faker.number.int({ min: 0, max: 100 }),
    imagePaths: [
      new ProductImage(faker.image.url(), faker.commerce.productName()),
    ],
    categoryIds: [faker.string.uuid()],
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...override,
  });
  return newProduct;
}
