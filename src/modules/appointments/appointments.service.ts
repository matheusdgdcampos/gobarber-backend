import {
  BadRequestException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { parseISO, startOfHour } from 'date-fns';
import { AppointmentsRepository } from './appointment.repository';
import { Appointments } from './entities/appointment.entity';
import { AppointmentCreateRequestDto } from './dto/appointment-create-request.dto';

@Injectable()
export class AppointmentsService {
  private logger = new Logger(AppointmentsService.name);

  constructor(protected appointmentsRepository: AppointmentsRepository) {}

  public async create(
    createAppointmentDto: AppointmentCreateRequestDto,
  ): Promise<Appointments> {
    try {
      const parsedDate = startOfHour(parseISO(createAppointmentDto.date));
      const findApppointmentInSameDate =
        await this.appointmentsRepository.findByDate(parsedDate);

      if (findApppointmentInSameDate) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'This appointment is already booked',
        });
      }

      const appointment = await this.appointmentsRepository.create({
        providerId: createAppointmentDto.providerId,
        date: parsedDate,
      });
      return appointment;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new UnprocessableEntityException();
    }
  }

  public findAll() {
    try {
      return this.appointmentsRepository.findAll();
    } catch (error) {
      this.logger.error(error);
      throw new UnprocessableEntityException();
    }
  }
}
