import { Category } from 'src/modules/category/domain/entities/category';

export class CategoryPresenter {
  static toHttp(category: Category | null) {
    return {
      id: category?.id.toString(),
      title: category?.title,
      slug: category?.slug.getValue(),
      description: category?.description,
      created_at: category?.createdAt,
      updated_at: category?.updatedAt,
    };
  }
}
