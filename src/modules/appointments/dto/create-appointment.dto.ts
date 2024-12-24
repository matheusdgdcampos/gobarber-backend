import { IsDateString, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  providerId: string;

  @IsDateString()
  date: Date;
}
