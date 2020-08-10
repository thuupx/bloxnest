import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  const options = new DocumentBuilder()
    .setTitle('Bloxnest API')
    .setDescription('This open API for Bloxnest')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', in: 'header', scheme: 'bearer', bearerFormat: 'Bearer ', name: 'Authorization' })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
