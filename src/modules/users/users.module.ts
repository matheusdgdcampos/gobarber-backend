import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './user.repository';
import { HashService } from '@common/services/hash.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, HashService],
  exports: [UsersService],
})
export class UsersModule {}
