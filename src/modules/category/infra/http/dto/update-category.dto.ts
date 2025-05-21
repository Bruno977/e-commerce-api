import { IsBoolean, IsString } from 'class-validator';

export class UpdateCategoryDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  isActive: boolean = true;
}
