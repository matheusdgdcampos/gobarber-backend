import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {}

  public async create(user: CreateUserDto): Promise<User> {
    const newUser = this.repository.create(user);
    await this.repository.save(newUser);
    return newUser;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }

  public async findById(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(user: UpdateUserDto, id: string): Promise<User> {
    await this.repository.update(id, user);
    const updatedUser = await this.findById(id);
    return updatedUser;
  }
}
