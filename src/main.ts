import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // attaches cookies to request object
  app.use(cookieParser());
  // applies security hardening settings. using defaults: https://www.npmjs.com/package/helmet
  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
