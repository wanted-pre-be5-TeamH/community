import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 앱 모듈 인스턴스화
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // DTO에 정의된 Property만 request 파라미터로 받음
  }));
  await app.listen(3000);
}
bootstrap();
