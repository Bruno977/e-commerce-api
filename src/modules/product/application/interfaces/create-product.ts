import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
interface ImageProps {
  path: string;
  alt: string;
}

export interface ICreateProduct {
  name: string;
  description: string;
  role: UserRole;
  price: number;
  originalPrice: number;
  discount?: number | null;
  stock: number;
  categoryIds: string[];
  images: ImageProps[];
}
