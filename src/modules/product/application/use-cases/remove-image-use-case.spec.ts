import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { makeFakeImage } from '../../test/factories/make-fake-image';
import { InMemoryImageRepository } from '../../test/repositories/in-memory-image.repository';
import { RemoveImageUseCase } from './remove-image.use-case';

let sut: RemoveImageUseCase;
let inMemoryImageRepository: InMemoryImageRepository;
describe('RemoveImageUseCase', () => {
  beforeEach(() => {
    inMemoryImageRepository = new InMemoryImageRepository();
    sut = new RemoveImageUseCase(inMemoryImageRepository);
  });
  it('should remove an image from a product', async () => {
    const image = makeFakeImage();
    await inMemoryImageRepository.create(image);
    expect(inMemoryImageRepository.images).toHaveLength(1);
    await sut.execute([image.id.toString()]);
    expect(inMemoryImageRepository.images).toHaveLength(0);
  });
  it("should throw if image doesn't exist", async () => {
    const result = await sut.execute(['non-existing-image-id']);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
