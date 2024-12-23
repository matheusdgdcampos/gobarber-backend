import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { parseISO, startOfHour } from 'date-fns';
import { randomUUID } from 'node:crypto';
import { AppointmentsRepository } from './appointment.repository';

@Injectable()
export class AppointmentsService {
  constructor(protected appointmentsRepository: AppointmentsRepository) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    const parsedDate = startOfHour(parseISO(createAppointmentDto.date));
    const findApppointmentInSameDate =
      this.appointmentsRepository.findByDate(parsedDate);

    if (findApppointmentInSameDate) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'This appointment is already booked',
      });
    }

    const appointment = new Appointment();
    appointment.id = randomUUID();
    appointment.provider = createAppointmentDto.provider;
    appointment.date = parsedDate;
    this.appointmentsRepository.create(appointment);
    return appointment;
  }

  findAll() {
    return this.appointmentsRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment with data ${JSON.stringify(updateAppointmentDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
