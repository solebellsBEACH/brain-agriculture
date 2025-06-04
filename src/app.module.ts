import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertiesModule } from './properties/properties.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProducersModule } from './producers/producers.module';
import { CropModule } from './crop/crop.module';
import { getDbConfig } from './database/config';


@Module({
  imports: [
    TypeOrmModule.forRoot(getDbConfig() as TypeOrmModuleOptions),
    PropertiesModule,
    ProducersModule,
    CropModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
