import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './user.repository';
import { HashService } from '@common/services/hash.service';
import { CloudStorageFileService } from '@common/services/cloud-storage-file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    HashService,
    CloudStorageFileService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
