import { IsDateString, IsString } from 'class-validator';

export class AppointmentCreateRequestDto {
  @IsString()
  provider: string;

  @IsDateString()
  date: string;
}
