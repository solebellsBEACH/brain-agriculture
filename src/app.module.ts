import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertiesModule } from './properties/properties.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './properties/entities/property.entity';
import { ProducersModule } from './producers/producers.module';
import { Producer } from './producers/entities/producer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: "postgres://postgres:postgres@localhost:5432/mydatabase",
      synchronize: true,
      entities: [Property, Producer]
    }),
    PropertiesModule,
    ProducersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
