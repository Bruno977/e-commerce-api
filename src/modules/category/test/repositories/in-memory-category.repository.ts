import { Category } from '../../domain/entities/category';
import { CategoryRepository } from '../../domain/repositories/category.repository';

export class InMemoryCategoryRepository implements CategoryRepository {
  public categories: Category[] = [];

  async create(category: Category): Promise<Category> {
    this.categories.push(category);
    return category;
  }

  async findById(id: string): Promise<Category | null> {
    return this.categories.find((category) => category.id === id) ?? null;
  }
  async findBySlug(slug: string): Promise<Category | null> {
    return (
      this.categories.find((category) => category.slug.getValue() === slug) ??
      null
    );
  }
  async remove(id: string): Promise<void> {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index !== -1) {
      this.categories.splice(index, 1);
    }
  }
  async update(category: Category): Promise<Category> {
    const index = this.categories.findIndex(
      (existingCategory) => existingCategory.id === category.id,
    );
    if (index !== -1) {
      this.categories[index] = category;
    }
    return category;
  }
  async findByIds(ids: string[]): Promise<Category[] | null> {
    const categories = this.categories.filter((category) =>
      ids.includes(category.id),
    );
    return categories.length > 0 ? categories : null;
  }
}
