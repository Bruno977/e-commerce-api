import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { RemoveCategoryUseCase } from 'src/modules/category/application/use-cases/remove-category.use-case';

@Controller('/categories/:id')
export class RemoveCategoryController {
  constructor(private removeCategory: RemoveCategoryUseCase) {}
  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    const result = await this.removeCategory.execute({
      categoryId: id,
    });
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
