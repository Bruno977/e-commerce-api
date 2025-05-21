import { Module } from '@nestjs/common';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { PrismaProductRepository } from './prisma/repositories/prisma-product.repository';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
  ],
})
export class DatabaseModule {}
