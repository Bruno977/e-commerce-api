import { Product } from 'src/modules/product/domain/entities/product';
import { ProductRepository } from 'src/modules/product/domain/repositories/product.repository';
import { PrismaProductMapper } from '../mapper/prisma-product.mapper';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}
  async create(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product);
    await this.prisma.product.create({
      data,
    });
  }
  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
        images: true,
      },
    });
    if (!product) {
      return null;
    }
    return PrismaProductMapper.toDomain(product);
  }
  async findByCategoryId(categoryId: string): Promise<Product[] | null> {
    const products = await this.prisma.product.findMany({
      where: {
        categories: {
          some: {
            id: categoryId,
          },
        },
      },
      include: {
        categories: true,
        images: true,
      },
    });
    if (!products) {
      return null;
    }
    return products.map((product) => PrismaProductMapper.toDomain(product));
  }
  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: {
        categories: true,
        images: true,
      },
    });
    if (!products) {
      return [];
    }
    return products.map((product) => PrismaProductMapper.toDomain(product));
  }
  async remove(productId: string): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
  async update(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product);
    await this.prisma.product.update({
      where: {
        id: product.id.toString(),
      },
      data,
      include: {
        categories: true,
        images: true,
      },
    });
  }
}
