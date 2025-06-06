import { InMemoryImageRepository } from '../../test/repositories/in-memory-image.repository';
import { FakeUploader } from '../../test/storage/fake-uploader';
import { UploadImagesUseCase } from './upload-images.use-case';

let sut: UploadImagesUseCase;
let inMemoryImageRepository: InMemoryImageRepository;
let fakeUploader: FakeUploader;

describe('UploadImagesUseCase', () => {
  beforeEach(() => {
    inMemoryImageRepository = new InMemoryImageRepository();
    fakeUploader = new FakeUploader();
    sut = new UploadImagesUseCase(inMemoryImageRepository, fakeUploader);
  });

  it('should upload images successfully', async () => {
    const result = await sut.execute({
      fileType: 'image/jpeg',
      fileName: 'image1.jpg',
      body: Buffer.from('image data 1'),
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.image.alt).toBe('image1.jpg');
  });
});
