import { HashService } from '@common/services/hash.service';
import { PrismaService } from '@common/services/prisma.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [PrismaService, HashService],
  exports: [PrismaService, HashService],
})
export class CommonModule { }
