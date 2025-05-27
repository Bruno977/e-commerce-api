import { InMemoryImageRepository } from '../../test/repositories/in-memory-image.repository';
import { UploadImagesUseCase } from './upload-images.use-case';

let sut: UploadImagesUseCase;
let inMemoryImageRepository: InMemoryImageRepository;

describe('UploadImagesUseCase', () => {
  beforeEach(() => {
    inMemoryImageRepository = new InMemoryImageRepository();
    sut = new UploadImagesUseCase(inMemoryImageRepository);
  });

  it('should upload images successfully', async () => {
    const files = [
      {
        path: 'image1.jpg',
        alt: 'Image 1',
      },
      {
        path: 'image2.jpg',
        alt: 'Image 2',
      },
    ];

    const result = await sut.execute(files);

    expect(result.isRight()).toBe(true);
    expect(result.value?.images).toHaveLength(2);
    expect(result.value?.images[0].path).toBe('image1.jpg');
    expect(result.value?.images[0].alt).toBe('Image 1');
    expect(result.value?.images[1].path).toBe('image2.jpg');
    expect(result.value?.images[1].alt).toBe('Image 2');
  });
});
