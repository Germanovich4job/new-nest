import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import expressBasicAuth from 'express-basic-auth';
import { ADMIN_LOGIN, ADMIN_PASSWORD } from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.use(expressBasicAuth({ users: { [ADMIN_LOGIN]: ADMIN_PASSWORD } }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-type', 'Access-Control-Allow-origin'],
    credentials: true,
    preflightContinue: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
