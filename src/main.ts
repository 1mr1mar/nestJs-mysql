import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,          // لحذف الحقول الغير معرفة في DTO
    forbidNonWhitelisted: true,  // يرفض الطلب لو فيه حقول غير معرفة
    transform: true,          // يحول البيانات لأنواعها (مثل string إلى number)
  })); // hadi katdir validation dyal data li katji mn lfront end
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
