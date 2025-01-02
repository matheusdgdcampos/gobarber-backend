import {
  Controller,
  Post,
  Body,
  Patch,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Authenticated } from '@common/decorators/auth.decorator';
import { AvatarFileInterceptor } from '@common/decorators/avatar-file.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Authenticated()
  @Patch('/avatar')
  @AvatarFileInterceptor()
  updateAvatar(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return this.usersService.updateAvatar(file, req.user.id);
  }
}
