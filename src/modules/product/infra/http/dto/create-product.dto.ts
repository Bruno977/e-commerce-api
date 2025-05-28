import {
  IsBoolean,
  IsNumber,
  IsString,
  IsUUID,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateProductControllerDTO {
  @IsString({ message: 'The "name" field must be a string.' })
  name: string;

  @IsString({ message: 'The "description" field must be a string.' })
  description: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'The "price" field must be a valid number.' },
  )
  price: number;

  @IsNumber({}, { message: 'The "stock" field must be a valid number.' })
  stock: number;

  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'The "discount" field must be a valid number.' },
  )
  discount: number;

  @IsArray({ message: 'The "categoryIds" field must be an array of UUIDs.' })
  @IsUUID('4', {
    each: true,
    message: 'Each "categoryId" must be a valid UUID.',
  })
  categoryIds: string[];

  @IsArray({ message: 'The "categoryIds" field must be an array of UUIDs.' })
  @IsUUID('4', {
    each: true,
    message: 'Each "categoryId" must be a valid UUID.',
  })
  @IsOptional()
  imageIds: string[];

  @IsBoolean({ message: 'The "isActive" field must be a boolean.' })
  @IsOptional()
  isActive: boolean = true;
}
