import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateCategoryUseCase } from 'src/modules/category/application/use-cases/create-category.use-case';
import { CreateCategoryDTO } from '../dto/create-category.dto';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';

@Controller('/categories')
export class CreateCategoryController {
  constructor(private createCategory: CreateCategoryUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateCategoryDTO) {
    const { title, description, isActive, role } = body;
    const result = await this.createCategory.execute({
      title,
      description,
      isActive,
      role,
    });
    console.log('result', result);
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
