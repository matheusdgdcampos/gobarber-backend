import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { EnvironmentVariables, validate } from './config/environments-config';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@common/modules/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      cache: true,
      expandVariables: true,
    }),
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'postgres',
        port: 5432,
        url: configService.getOrThrow('DATABASE_URL'),
        synchronize:
          configService.getOrThrow('NODE_ENV') === 'development' ? true : false,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    AppointmentsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
