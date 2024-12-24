import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { validate } from './config/environments-config';
import { CommonModule } from '@common/modules/common.modules';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from '@common/services/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    CommonModule,
    AppointmentsModule,
    UsersModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
