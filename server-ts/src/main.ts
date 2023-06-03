import * as dotenv from 'dotenv'
dotenv.config()
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(new JwtService, reflector))
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  }));
  await app.listen(process.env.PORT, process.env.HOST);
}
bootstrap();
