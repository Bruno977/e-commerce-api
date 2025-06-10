import { randomUUID } from 'node:crypto';
import { Uploader, UploaderProps } from '../../application/storage/uploader';

interface Upload {
  fileName: string;
  url: string;
}

export class FakeUploader implements Uploader {
  public uploads: Upload[] = [];
  async upload({ fileName }: UploaderProps) {
    const url = randomUUID();
    const uniqueUrl = `${url}-${fileName}`;
    this.uploads.push({
      fileName,
      url: uniqueUrl,
    });
    return {
      url: uniqueUrl,
    };
  }
}
