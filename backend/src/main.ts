import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';

async function bootstrap() {
  
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule,{cors:true});
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Gerenciamento de Estoque de Produtos')
    .setDescription(
      `O principio desse sistema é permitir o controle preciso de 
      entrada e saída deprodutos alimentícios do estoque.`,
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Servidor api rodando  em http(s)://{dominio}:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `Documentation swagger em http(s)://{dominio}:${process.env.PORT ?? 3000}/docs`,
  );
  //console.log(`Documentation swagger link import http(s)://{dominio}:${process.env.PORT ?? 3000}/swagger/api-json`)
}
bootstrap();
