import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Uploader, UploaderProps } from '../../application/storage/uploader';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploaderStorage implements Uploader {
  private s3Client: S3Client;
  constructor() {
    const bucketEndpointUrl = process.env.BUCKET_ENDPOINT_URL;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!bucketEndpointUrl || !accessKeyId || !secretAccessKey) {
      throw new Error(
        'Missing required environment variables: BUCKET_ENDPOINT_URL, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY',
      );
    }
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: bucketEndpointUrl,
      forcePathStyle: true,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }
  async upload({ body, fileName, fileType }: UploaderProps) {
    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-${fileName}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: uniqueFileName,
        Body: body,
        ContentType: fileType,
      }),
    );
    return {
      url: uniqueFileName,
    };
  }
}
