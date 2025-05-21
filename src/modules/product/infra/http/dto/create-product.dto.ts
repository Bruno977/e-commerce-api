import {
  IsBoolean,
  IsNumber,
  IsString,
  IsUUID,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ImageDTO {
  @IsString({ message: 'The "path" field must be a string.' })
  path: string;

  @IsString({ message: 'The "alt" field must be a string.' })
  alt: string;
}

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

  @IsArray({ message: 'The "images" field must be an array of objects.' })
  @ValidateNested({ each: true, message: 'Each image must be a valid object.' })
  @Type(() => ImageDTO)
  images: ImageDTO[];

  @IsBoolean({ message: 'The "isActive" field must be a boolean.' })
  @IsOptional()
  isActive: boolean = true;
}
