import { Either, right } from 'src/lib/common/either/either';
import { ProductImage } from '../../domain/entities/product-image';
import { IUploadImage } from '../interfaces/upload-image';
import { ImageRepository } from '../../domain/repositories/image.repository';
import { Uploader } from 'src/modules/product/application/storage/uploader';

type UploadImagesUseCaseResponse = Promise<
  Either<
    null,
    {
      image: ProductImage;
    }
  >
>;
export class UploadImagesUseCase {
  constructor(
    private imageRepository: ImageRepository,
    private uploaderRepository: Uploader,
  ) {}
  async execute({
    fileType,
    fileName,
    body,
  }: IUploadImage): UploadImagesUseCaseResponse {
    const { url } = await this.uploaderRepository.upload({
      fileName,
      fileType,
      body,
    });
    const image = ProductImage.create({
      alt: fileName,
      path: url,
    });

    await this.imageRepository.create(image);

    return right({
      image,
    });
  }
}
