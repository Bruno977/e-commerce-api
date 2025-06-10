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
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { UploadAttachmentUseCase } from 'src/modules/product/application/use-cases/upload-attachment.use-case';

@Controller('/files')
@AuthRoles(UserRole.ADMIN)
export class UploadAttachmentController {
  constructor(private uploadAttachment: UploadAttachmentUseCase) {}
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
    const result = await this.uploadAttachment.execute({
      fileType: file.mimetype,
      fileName: file.fieldname,
      body: file.buffer,
    });
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
    const { attachment } = result.value;
    return {
      attachmentId: attachment.id.toString(),
    };
  }
}
