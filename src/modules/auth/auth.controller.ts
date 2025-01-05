import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationRequestDto } from './dto/authentication-request.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body() body: AuthenticationRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signIn({
      email: body.email,
      password: body.password,
    });
    const ONE_DAY_EXPIRATIO_IN_MILLISECONDS = 86400000;
    /**
     * NOTE: if change time expiration of token need to convert the time in
     * milliseconds and put than to maxAge prop
     */
    res.cookie('accessToken', token.accessToken, {
      httpOnly: true,
      maxAge: ONE_DAY_EXPIRATIO_IN_MILLISECONDS,
      sameSite: 'lax', // Indicate only the app can be access cookies of application not a external applications Ex.: microservices
    });
    return token;
  }

  @Post('signout')
  async signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    return res.sendStatus(HttpStatus.NO_CONTENT).send('No content');
  }
}
