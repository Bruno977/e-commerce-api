import { Entity } from 'src/lib/common/entities/entity';
import { Slug } from '../value-objects/slug';
import { Optional } from 'src/lib/common/types/optional';
interface CategoryProps {
  title: string;
  description: string;
  isActive: boolean;
  slug: Slug;
  createdAt: Date;
  updatedAt: Date;
}

export class Category extends Entity<CategoryProps> {
  static create(
    props: Optional<CategoryProps, 'slug' | 'createdAt' | 'updatedAt'>,
  ) {
    return new Category({
      ...props,
      slug: Slug.fromTitle(props.title),
      isActive: props.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  get slug() {
    return this.props.slug;
  }
}
