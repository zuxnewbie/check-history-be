import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './middlewares';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // await app.listen(process.env.SERVER_PORT ?? 3000);

  app.setGlobalPrefix('/api/v1');
  app.use(cookieParser());
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: [process.env.CLIENT_HOST_CORS],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const configSwagger = new DocumentBuilder()
    .setTitle('History Checker Application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/api', app, document);

  console.log('process.env.SERVER_PORT:::', process.env.SERVER_PORT);
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(9001);
}
bootstrap();
