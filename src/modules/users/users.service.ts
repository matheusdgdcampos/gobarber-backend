import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './user.repository';
import { HashService } from '@common/services/hash.service';
import { UserCreateResponseDTO } from './dto/user-create-response.dto';

@Injectable()
export class UsersService {
  protected logger = new Logger(UsersService.name);

  constructor(
    protected repository: UsersRepository,
    protected hashService: HashService,
  ) {}

  public async create(
    createUserDto: CreateUserDto,
  ): Promise<UserCreateResponseDTO> {
    try {
      const userAlreadyExists = await this.repository.findByEmail(
        createUserDto.email,
      );

      if (userAlreadyExists) {
        throw new UnprocessableEntityException();
      }

      const hashPassword = await this.hashService.hashContent(
        createUserDto.password,
      );
      const user = await this.repository.create({
        ...createUserDto,
        password: hashPassword,
      });
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
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
