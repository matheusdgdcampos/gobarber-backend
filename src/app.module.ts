import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { validate } from './config/environments-config';
import { CommonModule } from '@common/modules/common.modules';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from '@common/services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    JwtModule.register({
      global: true,
    }),
    CommonModule,
    AppointmentsModule,
    UsersModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
