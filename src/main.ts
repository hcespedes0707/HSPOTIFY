import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors(); // Permitir todos los orígenes

  // Configuración para servir archivos estáticos de 'imagenes' y 'canciones'
  app.useStaticAssets(join(__dirname, '..', 'imagenes'), {
    prefix: '/imagenes',
  });
  app.useStaticAssets(join(__dirname, '..', 'canciones'), {
    prefix: '/canciones',
  });

  // Iniciar la aplicación en el puerto 3001 y en IPv4

  await app.listen(3001);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
