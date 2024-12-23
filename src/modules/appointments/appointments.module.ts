import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsRepository } from './appointment.repository';
import { PrismaService } from '@common/services/prisma.service';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentsRepository, PrismaService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
