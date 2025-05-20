import { Product } from 'src/modules/product/domain/entities/product';
import { Prisma, Product as ProductPrisma } from '@prisma/client';
import { Price } from 'src/modules/product/domain/value-objects/price';
import { ProductImage } from 'src/modules/product/domain/value-objects/product-image';

interface ImageProps {
  alt: string;
  path: string;
}
interface CategoryProps {
  id: string;
}
export class PrismaProductMapper {
  static toDomain(
    prismaProduct: ProductPrisma & {
      categories: CategoryProps[];
      images: ImageProps[];
    },
  ): Product {
    return new Product(
      {
        name: prismaProduct.name,
        description: prismaProduct.description,
        price: new Price(prismaProduct.price),
        originalPrice: new Price(prismaProduct.originalPrice),
        discount: prismaProduct.discount,
        stock: prismaProduct.stock,
        createdAt: prismaProduct.createdAt,
        updatedAt: prismaProduct.updatedAt,
        categoryIds: prismaProduct.categories.map((category) => category.id),
        imagePaths: prismaProduct.images.map(
          (image) => new ProductImage(image.path, image.alt),
        ),
      },
      prismaProduct.id,
    );
  }

  static toPrisma(product: Product): Prisma.ProductCreateInput {
    return {
      name: product.name,
      description: product.description,
      price: product.currentPrice,
      discount: product.discount,
      originalPrice: product.originalPrice,
      stock: product.stock,
      categories: {
        connect: product.categoriesIds.map((id) => ({ id })),
      },
      images: {
        create: product.images.map((image) => ({
          path: image.imagePath,
          alt: image.altText,
        })),
      },
    };
  }
}
