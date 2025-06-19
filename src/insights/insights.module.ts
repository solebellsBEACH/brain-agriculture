import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from '../producers/entities/producer.entity';
import { Property } from '../properties/entities/property.entity';
import { InsightsService } from './insights.service';
import { InsightsController } from './insights.controller';
import { Crop } from 'src/crop/entities/crop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producer, Crop, Property])],
  controllers: [InsightsController],
  providers: [InsightsService],
})
export class InsightsModule {}
