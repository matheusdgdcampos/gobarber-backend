import { User } from '@modules/users/entities/user.entity';
import { IsDateString, IsObject } from 'class-validator';

export class CreateAppointmentDto {
  @IsObject()
  providerId: User;

  @IsDateString()
  date: Date;
}
