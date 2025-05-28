import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './database/data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(app.getHttpServer())
}
bootstrap();


// AppDataSource.initialize()
//   .then(() => {
//     console.log('📦 Banco de dados sincronizado com sucesso!');
//     // Aqui você pode iniciar seu servidor (Express, Nest, etc.)
//   })
//   .catch((error) => {
//     console.error('❌ Erro ao sincronizar com o banco:', error);
//   });
