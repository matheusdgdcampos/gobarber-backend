import { IsDateString, IsString } from 'class-validator';

export class AppointmentCreateRequestDto {
  @IsString()
  providerId: string;

  @IsDateString()
  date: string;
}
