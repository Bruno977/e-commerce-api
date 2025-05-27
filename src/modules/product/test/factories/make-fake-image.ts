import { faker } from '@faker-js/faker/.';
import {
  ProductImage,
  ProductImageProps,
} from '../../domain/entities/product-image';

export function makeFakeImage(
  override: Partial<ProductImageProps> = {},
): ProductImage {
  return ProductImage.create({
    path: faker.image.url(),
    alt: faker.lorem.sentence(),
    ...override,
  });
}
