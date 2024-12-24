import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  protected logger = new Logger(UsersService.name);

  constructor(protected repository: UsersRepository) {}

  public async create(createUserDto: CreateUserDto) {
    try {
      const userAlreadyExists = await this.repository.findByEmail(
        createUserDto.email,
      );

      if (userAlreadyExists) {
        throw new UnprocessableEntityException();
      }

      const user = await this.repository.create(createUserDto);
      return user;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof UnprocessableEntityException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  public async findByEmail(email: string) {
    try {
      const user = await this.repository.findByEmail(email);

      if (!user) {
        throw new NotFoundException();
      }

      return user;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
