import { Prisma, Category as PrismaCategory } from '@prisma/client';
import { Category } from 'src/modules/category/domain/entities/category';
import { Slug } from 'src/modules/category/domain/value-objects/slug';

export class PrismaCategoryMapper {
  static toPrisma(category: Category): Prisma.CategoryCreateInput {
    return {
      title: category.title,
      slug: category.slug.getValue(),
      description: category.description,
      isActive: category.isActive,
    };
  }
  static toDomain(category: PrismaCategory): Category {
    return new Category(
      {
        title: category.title,
        slug: new Slug(category.slug),
        description: category.description,
        isActive: category.isActive,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
      category.id,
    );
  }
}
export class toDomain {}
