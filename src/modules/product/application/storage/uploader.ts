export interface UploaderProps {
  fileName: string;
  fileType: string;
  body: Buffer;
}

export abstract class Uploader {
  abstract upload(props: UploaderProps): Promise<{ url: string }>;
}
