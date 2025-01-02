import { HashService } from '@common/services/hash.service';
import { CloudStorageFileService } from '@common/services/cloud-storage-file.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [HashService, CloudStorageFileService],
  exports: [HashService, CloudStorageFileService],
})
export class CommonModule {}
