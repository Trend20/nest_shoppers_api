import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { setupSwagger } from './common/config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // attaches cookies to request object
  app.use(cookieParser());
  // enforce more security
  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
