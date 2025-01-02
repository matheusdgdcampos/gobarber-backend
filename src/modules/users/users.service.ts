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
import { CloudStorageFileService } from '@common/services/cloud-storage-file.service';
import { UpdateUserResponseDTO } from './dto/update-user-response.dto';

@Injectable()
export class UsersService {
  protected logger = new Logger(UsersService.name);

  constructor(
    protected readonly repository: UsersRepository,
    protected readonly hashService: HashService,
    protected readonly cloudStorageFileService: CloudStorageFileService,
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

  public async updateAvatar(
    file: Express.Multer.File,
    userId: string,
  ): Promise<UpdateUserResponseDTO> {
    const userExists = await this.repository.findById(userId);

    if (!userExists) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        message: 'Unprocessable entity',
      });
    }

    const uploadResults = await this.cloudStorageFileService.upload(file);

    if (!uploadResults.success) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        message: 'Unprocessable entity',
      });
    }

    const updatedUser = await this.repository.update(
      {
        avatar: {
          filename: uploadResults.filename,
          url: uploadResults.fileUrl,
        },
      },
      userId,
    );

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }

  public async findById(userId: string) {
    try {
      const userExists = await this.repository.findById(userId);

      if (!userExists) {
        throw new NotFoundException({
          statusCode: 404,
          message: 'User not found',
        });
      }

      return userExists;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
