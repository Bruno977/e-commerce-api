import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { RemoveAttachmentUseCase } from 'src/modules/product/application/use-cases/remove-attachment.use-case';

@Controller('/files/:attachmentId')
@AuthRoles(UserRole.ADMIN)
export class RemoveAttachmentController {
  constructor(private removeAttachment: RemoveAttachmentUseCase) {}
  @Delete()
  @HttpCode(204)
  async handle(@Param('attachmentId') attachmentId: string) {
    const result = await this.removeAttachment.execute(attachmentId);
    if (result.isLeft()) {
      throw result.value;
    }
  }
}
