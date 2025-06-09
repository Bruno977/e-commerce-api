import { Prisma } from '@prisma/client';
import { ProductImage } from 'src/modules/product/domain/entities/product-image';

export class PrismaProductImageMapper {
  static toDomain(raw: Prisma.ProductImageCreateInput): ProductImage {
    return ProductImage.create({
      path: raw.path,
      alt: raw.alt,
    });
  }

  static toPrisma(image: ProductImage): Prisma.ProductImageCreateInput {
    return {
      path: image.path,
      alt: image.alt || '',
    };
  }
}
