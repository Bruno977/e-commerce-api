import { Category } from '../entities/category';

export abstract class CategoryRepository {
  abstract create(category: Category): Promise<Category>;
  abstract findById(id: string): Promise<Category | null>;
  abstract findBySlug(slug: string): Promise<Category | null>;
}
