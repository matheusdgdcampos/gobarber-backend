import { Injectable } from '@nestjs/common';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectRepository(Appointment)
    protected readonly repository: Repository<Appointment>,
  ) {}

  public async create(appointment: CreateAppointmentDto): Promise<Appointment> {
    const newAppointment = this.repository.create(appointment);
    await this.repository.save(newAppointment);
    return newAppointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.repository.findOne({
      where: {
        date: date,
      },
    });
    return findAppointment;
  }

  public async findAll(): Promise<Appointment[]> {
    return this.repository.find({
      relations: ['providerId'],
      select: {
        id: true,
        date: true,
        providerId: {
          id: true,
          name: true,
          email: true,
          avatar: {
            url: true,
          },
          createdAt: true,
          updatedAt: true,
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
