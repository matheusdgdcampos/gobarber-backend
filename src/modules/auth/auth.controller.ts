import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationRequestDto } from './dto/authentication-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() body: AuthenticationRequestDto) {
    return this.authService.signIn({
      email: body.email,
      password: body.password,
    });
  }
}
