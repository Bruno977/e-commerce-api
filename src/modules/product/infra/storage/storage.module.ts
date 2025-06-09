import { Module } from '@nestjs/common';
import { Uploader } from '../../application/storage/uploader';
import { UploaderStorage } from './uploader';

@Module({
  providers: [
    {
      provide: Uploader,
      useClass: UploaderStorage,
    },
  ],
  exports: [Uploader],
})
export class StorageModule {}
