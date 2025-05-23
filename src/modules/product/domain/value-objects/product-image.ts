interface ProductImageProps {
  path: string;
  alt: string;
}

export class ProductImage {
  constructor(private props: ProductImageProps) {}

  static create(props: ProductImageProps) {
    if (!props.path) {
      throw new Error('Image path cannot be empty.');
    }
    return new ProductImage(props);
  }

  get path(): string {
    return this.props.path;
  }

  get alt(): string {
    return this.props.alt;
  }
}
