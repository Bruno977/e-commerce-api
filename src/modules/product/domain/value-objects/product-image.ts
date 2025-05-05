export class ProductImage {
  constructor(
    private readonly path: string,
    private readonly _altText: string,
  ) {
    if (!path) {
      throw new Error('Image path cannot be empty.');
    }
  }

  get imagePath(): string {
    return this.path;
  }

  get altText(): string {
    return this._altText;
  }
  getFullUrl(baseUrl: string): string {
    return `${baseUrl}${this.path}`;
  }
}
