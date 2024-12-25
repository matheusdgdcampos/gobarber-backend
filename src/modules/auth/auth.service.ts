import { UsersService } from '@modules/users/users.service';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentVariables } from 'src/config/environments-config';
import { AuthenticationRequestDto } from './dto/authentication-request.dto';
import { HashService } from '@common/services/hash.service';

@Injectable()
export class AuthService {
  protected readonly logger = new Logger(AuthService.name);

  constructor(
    protected readonly userService: UsersService,
    protected readonly jwtService: JwtService,
    protected readonly configService: ConfigService<EnvironmentVariables>,
    protected readonly hashService: HashService,
  ) {}

  private async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    const passwordIsEqual = await this.hashService.compareHashContent(
      password,
      user.password,
    );
    if (passwordIsEqual) {
      return user;
    }
    return null;
  }

  public async signIn(data: AuthenticationRequestDto) {
    try {
      const user = await this.validateUser(data.email, data.password);

      if (!user) {
        throw new UnauthorizedException();
      }

      const payload = { email: user.email, id: user.id };
      return {
        accessToken: this.jwtService.sign(payload, {
          subject: user.id,
          expiresIn: this.configService.getOrThrow('JWT_EXPIRES_IN'),
          secret: this.configService.getOrThrow('JWT_SECRET'),
        }),
      };
    } catch (error) {
      this.logger.error(error);

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
