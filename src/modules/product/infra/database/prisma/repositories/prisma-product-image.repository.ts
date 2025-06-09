import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { ProductImage } from 'src/modules/product/domain/entities/product-image';
import { ImageRepository } from 'src/modules/product/domain/repositories/image.repository';
import { PrismaProductImageMapper } from '../mapper/prisma-product-image.mapper';

@Injectable()
export class PrismaProductImageRepository implements ImageRepository {
  constructor(private prisma: PrismaService) {}

  async create(image: ProductImage): Promise<void> {
    const data = PrismaProductImageMapper.toPrisma(image);
    await this.prisma.productImage.create({
      data,
    });
  }
  async findById(id: string): Promise<ProductImage | null> {
    const productImage = await this.prisma.productImage.findUnique({
      where: { id },
    });
    if (!productImage) {
      return null;
    }
    return PrismaProductImageMapper.toDomain(productImage);
  }
  async findByIds(ids: string[]): Promise<ProductImage[]> {
    const productImages = await this.prisma.productImage.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return productImages.map((productImage) =>
      PrismaProductImageMapper.toDomain(productImage),
    );
  }
  async delete(id: string): Promise<void> {
    await this.prisma.productImage.delete({
      where: { id },
    });
  }
}
