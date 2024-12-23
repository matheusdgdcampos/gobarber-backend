import { BadRequestException, Injectable } from '@nestjs/common';
import { parseISO, startOfHour } from 'date-fns';
import { AppointmentsRepository } from './appointment.repository';
import { Appointments } from './entities/appointment.entity';
import { AppointmentCreateRequestDto } from './dto/appointment-create-request.dto';

@Injectable()
export class AppointmentsService {
  constructor(protected appointmentsRepository: AppointmentsRepository) {}

  public async create(
    createAppointmentDto: AppointmentCreateRequestDto,
  ): Promise<Appointments> {
    const parsedDate = startOfHour(parseISO(createAppointmentDto.date));
    const findApppointmentInSameDate =
      this.appointmentsRepository.findByDate(parsedDate);

    if (findApppointmentInSameDate) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'This appointment is already booked',
      });
    }

    const appointment = await this.appointmentsRepository.create({
      provider: createAppointmentDto.provider,
      date: parsedDate,
    });
    return appointment;
  }

  public findAll() {
    return this.appointmentsRepository.findAll();
  }
}
