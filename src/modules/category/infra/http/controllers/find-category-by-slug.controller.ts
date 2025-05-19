import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { Public } from 'src/modules/auth/infra/auth/public';
import { FindCategoryBySlugUseCase } from 'src/modules/category/application/use-cases/find-category-by-slug.use-case';
import { CategoryPresenter } from '../presenters/category.presenter';

@Controller('/categories/slug/:slug')
@Public()
export class FindCategoryBySlugController {
  constructor(private findCategoryBySlug: FindCategoryBySlugUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@Param('slug') slug: string) {
    const result = await this.findCategoryBySlug.execute(slug);
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
    return {
      category: CategoryPresenter.toHttp(result.value.category),
    };
  }
}
