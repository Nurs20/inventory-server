import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173', // Укажите здесь адрес вашего клиентского приложения
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // Разрешённые HTTP методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешённые заголовки
    credentials: true, // Разрешение передачи cookies и credentials
  };
  app.enableCors(corsOptions);

  await app.listen(3001);
}
bootstrap();
