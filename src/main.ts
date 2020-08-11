import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
const path: string = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : '.env.development'
config({ path });
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/transform.interceptor';
import setUpSwagger from './setupSwagger';
const helmet = require('helmet');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(helmet({
    contentSecurityPolicy: {
      reportOnly: true
    }
  }));
  app.enableCors({
    allowedHeaders: 'localhost'
  })
  const instance = app.getHttpAdapter().getInstance();
  setUpSwagger(app, instance)
  await app.listen(3000);
}
bootstrap();
