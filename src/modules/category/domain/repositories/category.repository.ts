import { Category } from '../entities/category';

export abstract class CategoryRepository {
  abstract create(category: Category): Promise<Category>;
  abstract findById(id: string): Promise<Category | null>;
  abstract findByIds(ids: string[]): Promise<Category[] | null>;
  abstract findBySlug(slug: string): Promise<Category | null>;
  abstract remove(categoryId: string): Promise<void>;
  abstract update(category: Category): Promise<Category>;
}
