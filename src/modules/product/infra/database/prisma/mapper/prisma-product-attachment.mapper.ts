import { Prisma } from '@prisma/client';
import { Attachment } from 'src/modules/product/domain/entities/attachment';

export class PrismaProductAttachmentMapper {
  static toDomain(raw: Prisma.ProductImageCreateInput): Attachment {
    return Attachment.create({
      url: raw.path,
      title: raw.alt,
    });
  }

  static toPrisma(attachment: Attachment): Prisma.ProductImageCreateInput {
    return {
      path: attachment.url,
      alt: attachment.title || '',
    };
  }
}
