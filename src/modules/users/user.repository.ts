import { PrismaService } from '@common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(protected prismaService: PrismaService) {}

  public async create(user: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: user,
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
