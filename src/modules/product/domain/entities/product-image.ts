import { Entity } from 'src/lib/common/entities/entity';
import { Id } from 'src/lib/common/entities/id';

interface ProductImageProps {
  path: string;
  alt?: string;
}

export class ProductImage extends Entity<ProductImageProps> {
  static create(props: ProductImageProps, id?: Id) {
    if (!props.path) {
      throw new Error('ProductImage must have a path');
    }
    return new ProductImage(props, id);
  }

  get path() {
    return this.props.path;
  }

  get alt() {
    return this.props.alt;
  }

  updatePath(path: string) {
    this.props.path = path;
  }

  updateAlt(alt: string) {
    this.props.alt = alt;
  }
  equals(image: ProductImage): boolean {
    return this.id === image.id;
  }
}
