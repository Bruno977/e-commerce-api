import { Either, left, right } from 'src/lib/common/either/either';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { ImageRepository } from '../../domain/repositories/image.repository';

type RemoveImageResponse = Promise<Either<ResourceNotFoundError, null>>;
export class RemoveImageUseCase {
  constructor(private imageRepository: ImageRepository) {}

  async execute(imageId: string): RemoveImageResponse {
    const image = await this.imageRepository.findById(imageId);

    if (!image) {
      return left(new ResourceNotFoundError('Image not found'));
    }

    await this.imageRepository.delete(imageId);

    return right(null);
  }
}
