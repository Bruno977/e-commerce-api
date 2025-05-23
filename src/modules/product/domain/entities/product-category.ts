import { Id } from 'src/lib/common/entities/id';

interface ProductCategoryProps {
  id: Id;
  title: string;
}
export class ProductCategory {
  private props: ProductCategoryProps;

  constructor(props: ProductCategoryProps) {
    this.props = props;
  }
  static create(props: ProductCategoryProps) {
    if (!props.id) {
      throw new Error('ProductCategory must have an id');
    }
    if (!props.title) {
      throw new Error('ProductCategory must have a title');
    }
    return new ProductCategory(props);
  }
  get id() {
    return this.props.id;
  }
  get title() {
    return this.props.title;
  }
  updateTitle(title: string) {
    this.props.title = title;
  }
}
