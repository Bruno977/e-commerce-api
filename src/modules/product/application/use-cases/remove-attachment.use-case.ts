import { Either, left, right } from 'src/lib/common/either/either';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { AttachmentRepository } from '../../domain/repositories/attachment.repository';

type RemoveAttachmentResponse = Promise<Either<ResourceNotFoundError, null>>;
export class RemoveAttachmentUseCase {
  constructor(private attachmentRepository: AttachmentRepository) {}

  async execute(attachmentId: string): RemoveAttachmentResponse {
    const attachment = await this.attachmentRepository.findById(attachmentId);

    if (!attachment) {
      return left(new ResourceNotFoundError('Attachment not found'));
    }

    await this.attachmentRepository.delete(attachmentId);

    return right(null);
  }
}
