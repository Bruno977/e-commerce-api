interface ImageProps {
  path: string;
  alt: string;
}

export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  discount?: number | null;
  stock: number;
  categoryIds: string[];
  images: ImageProps[];
}
