import {
  Controller,
  FileTypeValidator,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadImagesUseCase } from 'src/modules/product/application/use-cases/upload-images.use-case';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';

@Controller('/files')
@AuthRoles(UserRole.ADMIN)
export class UploadImagesController {
  constructor(private uploadImages: UploadImagesUseCase) {}
  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2, // 2mb
          }),
          new FileTypeValidator({
            fileType: '.(png|jpg|jpeg|pdf)',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.uploadImages.execute({
      fileType: file.mimetype,
      fileName: file.fieldname,
      body: file.buffer,
    });
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
    const { image } = result.value;
    return {
      attachmentId: image.id.toString(),
    };
  }
}
