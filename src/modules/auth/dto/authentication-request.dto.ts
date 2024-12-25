import { IsNotEmpty, IsString } from 'class-validator';

export class AuthenticationRequestDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
