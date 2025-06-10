import { Prisma } from '@prisma/client';
import { Attachment } from 'src/modules/product/domain/entities/attachment';

export class PrismaProductAttachmentMapper {
  static toDomain(raw: Prisma.AttachmentCreateInput): Attachment {
    return Attachment.create({
      url: raw.url,
      title: raw.title,
    });
  }

  static toPrisma(attachment: Attachment): Prisma.AttachmentCreateInput {
    return {
      url: attachment.url,
      title: attachment.title || '',
    };
  }
}
