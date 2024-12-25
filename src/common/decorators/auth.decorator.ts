import { AuthGuard } from '@common/guards/auth.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';

export const Authenticated = () => applyDecorators(UseGuards(AuthGuard));
