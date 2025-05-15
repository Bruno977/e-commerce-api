import { IsBoolean, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  isActive: boolean = true;
}
