import { IsDateString, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  provider: string;

  @IsDateString()
  date: string;
}
