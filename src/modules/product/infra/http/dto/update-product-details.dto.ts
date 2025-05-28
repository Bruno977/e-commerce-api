import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDetailsDTO {
  @IsString({ message: 'The "name" field must be a string.' })
  name: string;

  @IsString({ message: 'The "description" field must be a string.' })
  description: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'The "price" field must be a valid number.' },
  )
  price: number;

  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'The "discount" field must be a valid number.' },
  )
  discount: number;

  @IsNumber({}, { message: 'The "stock" field must be a valid number.' })
  stock: number;
}
