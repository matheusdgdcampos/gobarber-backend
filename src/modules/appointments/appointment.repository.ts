import { Injectable } from '@nestjs/common';
import { Appointments } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PrismaService } from '@common/services/prisma.service';

@Injectable()
export class AppointmentsRepository {
  constructor(protected prismaService: PrismaService) {}

  public async create(
    appointment: CreateAppointmentDto,
  ): Promise<Appointments> {
    const newAppointment = await this.prismaService.appointments.create({
      data: appointment,
    });
    return newAppointment;
  }

  public async findByDate(date: Date): Promise<Appointments | undefined> {
    const findAppointment = await this.prismaService.appointments.findFirst({
      where: {
        date: date,
      },
    });
    return findAppointment;
  }

  public async findAll(): Promise<Appointments[]> {
    return this.prismaService.appointments.findMany();
  }
}
