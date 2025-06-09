import { Either, left, right } from 'src/lib/common/either/either';
import { ProductImage } from '../../domain/entities/product-image';
import { IUploadImage } from '../interfaces/upload-image';
import { ImageRepository } from '../../domain/repositories/image.repository';
import { Uploader } from 'src/modules/product/application/storage/uploader';
import { Injectable } from '@nestjs/common';
import { InvalidValueError } from 'src/lib/common/errors/invalid-value-error';

type UploadImagesUseCaseResponse = Promise<
  Either<
    InvalidValueError,
    {
      image: ProductImage;
    }
  >
>;
@Injectable()
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
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidValueError(fileType));
    }
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
