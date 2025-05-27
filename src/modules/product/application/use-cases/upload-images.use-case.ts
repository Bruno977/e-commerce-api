import { Either, right } from 'src/lib/common/either/either';
import { ProductImage } from '../../domain/entities/product-image';
import { IUploadImage } from '../interfaces/upload-image';
import { ImageRepository } from '../../domain/repositories/image.repository';

type UploadImagesUseCaseResponse = Promise<
  Either<
    null,
    {
      images: ProductImage[];
    }
  >
>;
export class UploadImagesUseCase {
  constructor(private imageRepository: ImageRepository) {}
  async execute(imagesData: IUploadImage[]): UploadImagesUseCaseResponse {
    const images = imagesData.map((image) =>
      ProductImage.create({
        alt: image.alt,
        path: image.path,
      }),
    );
    await this.imageRepository.createMany(images);

    return right({
      images,
    });
  }
}
