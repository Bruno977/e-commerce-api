import { Controller, Get, HttpCode } from '@nestjs/common';
import { FindAllCategoriesUseCase } from 'src/modules/category/application/use-cases/find-all-categories.use-case';
import { CategoryPresenter } from '../presenters/category.presenter';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/modules/auth/infra/auth/public';

@Controller('categories')
@Public()
@ApiTags('Category')
export class FindAllCategoriesController {
  constructor(private findAllCategories: FindAllCategoriesUseCase) {}
  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Find all categories',
  })
  async handle() {
    const result = await this.findAllCategories.execute();
    return {
      categories: result.value?.categories.map((category) =>
        CategoryPresenter.toHttp(category),
      ),
    };
  }
}
