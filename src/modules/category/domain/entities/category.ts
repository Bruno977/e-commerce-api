import { Entity } from 'src/lib/common/entities/entity';
import { Slug } from '../value-objects/slug';
import { Optional } from 'src/lib/common/types/optional';
export interface CategoryProps {
  title: string;
  description: string;
  isActive: boolean;
  slug: Slug;
  createdAt: Date;
  updatedAt: Date;
}

export class Category extends Entity<CategoryProps> {
  static create(
    props: Optional<
      CategoryProps,
      'slug' | 'createdAt' | 'updatedAt' | 'isActive'
    >,
  ) {
    return new Category({
      ...props,
      slug: props.slug ?? Slug.fromTitle(props.title),
      isActive: props.isActive ?? true,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    });
  }
  private updateTimestamps() {
    this.props.updatedAt = new Date();
  }
  get title() {
    return this.props.title;
  }
  get description() {
    return this.props.description;
  }
  get isActive() {
    return this.props.isActive;
  }
  get slug() {
    return this.props.slug;
  }
  updateTitle(title: string) {
    this.props.title = title;
    this.props.slug = Slug.fromTitle(title);
    this.updateTimestamps();
  }
  updateDescription(description: string) {
    this.props.description = description;
    this.updateTimestamps();
  }
  updateIsActive(isActive: boolean) {
    this.props.isActive = isActive;
    this.updateTimestamps();
  }
}
