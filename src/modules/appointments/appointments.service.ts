import {
  BadRequestException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { parseISO, startOfHour } from 'date-fns';
import { AppointmentsRepository } from './appointment.repository';
import { AppointmentCreateRequestDto } from './dto/appointment-create-request.dto';
import { UsersService } from '@modules/users/users.service';
import { AppointmentCreateRespondeDto } from './dto/appointment-create-response.dto';

@Injectable()
export class AppointmentsService {
  private logger = new Logger(AppointmentsService.name);

  constructor(
    protected readonly appointmentsRepository: AppointmentsRepository,
    protected readonly usersService: UsersService,
  ) {}

  public async create(
    createAppointmentDto: AppointmentCreateRequestDto,
  ): Promise<AppointmentCreateRespondeDto> {
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

      const user = await this.usersService.findById(
        createAppointmentDto.providerId,
      );
      const appointment = await this.appointmentsRepository.create({
        providerId: user,
        date: parsedDate,
      });
      const response: AppointmentCreateRespondeDto = {
        id: appointment.id,
        date: appointment.date,
        providerId: appointment.providerId.id,
      };
      return response;
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
