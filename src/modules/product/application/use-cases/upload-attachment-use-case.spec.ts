import { InMemoryAttachmentRepository } from '../../test/repositories/in-memory-attachment.repository';
import { FakeUploader } from '../../test/storage/fake-uploader';
import { UploadAttachmentUseCase } from './upload-attachment.use-case';

let sut: UploadAttachmentUseCase;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let fakeUploader: FakeUploader;

describe('UploadAttachmentUseCase', () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    fakeUploader = new FakeUploader();
    sut = new UploadAttachmentUseCase(
      inMemoryAttachmentRepository,
      fakeUploader,
    );
  });

  it('should upload attachment successfully', async () => {
    const result = await sut.execute({
      fileType: 'image/jpeg',
      fileName: 'image1.jpg',
      body: Buffer.from('image data 1'),
    });

    expect(result.isRight()).toBe(true);
    const attachment = inMemoryAttachmentRepository.attachments[0];
    expect(attachment.title).toBe('image1.jpg');
    expect(attachment.url).toContain('image1.jpg');
  });
});
