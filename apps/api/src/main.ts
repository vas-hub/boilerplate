import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const globalPrefix = configService.get('API_BASEPATH');
  const port = configService.get('PORT') || 3001;

  app.setGlobalPrefix(globalPrefix);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: '*',

    })
  }
  await app.listen(port);
}
bootstrap();
