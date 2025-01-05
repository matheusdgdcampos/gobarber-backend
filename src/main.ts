import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { EnvironmentVariables } from './config/environments-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      skipMissingProperties: true,
    }),
  );
  app.enableCors({
    credentials: true,
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:5173',
  });
  app.use(cookieParser());
  const configService = app.get(ConfigService<EnvironmentVariables>);
  const port = configService.getOrThrow('PORT', 3333);
  const logger = new Logger('bootstrap');
  await app.listen(port, () => {
    logger.log(`Server is running...`);
  });
}
bootstrap();
