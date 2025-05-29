import { IsArray, IsUUID } from 'class-validator';

export class RemoveCategoryFromProductDTO {
  @IsArray({ message: 'The "categoryIds" field must be an array of UUIDs.' })
  @IsUUID('4', {
    each: true,
    message: 'Each "categoryId" must be a valid UUID.',
  })
  categoryIds: string[];
}
