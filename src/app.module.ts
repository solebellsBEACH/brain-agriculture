import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertiesModule } from './properties/properties.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './properties/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    url: "postgres://postgres:postgres@localhost:5432/mydatabase",
    synchronize: true,
    entities: [Property]
  }), PropertiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
