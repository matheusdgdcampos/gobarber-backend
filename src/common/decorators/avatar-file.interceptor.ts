import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export const AvatarFileInterceptor = () =>
  applyDecorators(UseInterceptors(FileInterceptor('avatar')));
