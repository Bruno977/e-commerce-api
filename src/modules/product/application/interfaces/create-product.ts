export interface ImageProps {
  path: string;
  alt: string;
}
export interface IProductCategoryProps {
  id: string;
  title: string;
}

export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  discount?: number | null;
  stock: number;
  categories: IProductCategoryProps[];
  images: ImageProps[];
}
