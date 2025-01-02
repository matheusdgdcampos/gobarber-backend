import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class AppointmentCreateRespondeDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDate()
  date: Date;

  @IsString()
  @IsNotEmpty()
  providerId: string;
}
