import { Price } from 'src/modules/product/domain/value-objects/price';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { PrismaProductMapper } from '../../database/prisma/mapper/prisma-product.mapper';
import { makeFakeProduct } from 'src/modules/product/test/factories/make-fake-product';
import * as request from 'supertest';
import { ProductImage } from 'src/modules/product/domain/value-objects/product-image';
import { PrismaCategoryMapper } from 'src/modules/category/infra/database/prisma/mapper/prisma-category.mapper';
import { makeFakeCategory } from 'src/modules/category/test/factories/make-fake-category';

describe('findByIdController (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });
  it('/GET /products/:id', async () => {
    const category = await prisma.category.create({
      data: PrismaCategoryMapper.toPrisma(makeFakeCategory()),
    });
    const product = await prisma.product.create({
      data: PrismaProductMapper.toPrisma(
        makeFakeProduct({
          price: new Price(90),
          originalPrice: new Price(100),
          discount: 10,
          imagePaths: [
            new ProductImage('/image1.jpg', 'Image 1'),
            new ProductImage('/image2.jpg', 'Image 2'),
          ],
          categoryIds: [category.id],
        }),
      ),
    });
    const result = await request(app.getHttpServer()).get(
      `/products/${product.id}`,
    );
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      id: product.id,
      name: product.name,
      description: product.description,
      originalPrice: 100,
      price: 90,
      discount: 10,
      stock: product.stock,
      images: [
        {
          alt: 'Image 1',
          path: '/image1.jpg',
        },
        {
          alt: 'Image 2',
          path: '/image2.jpg',
        },
      ],
      categories: [category.id],
      // categories: [
      //   {
      //     id: category.id,
      //     title: category.title,
      //   },
      // ],
    });
  });
});
