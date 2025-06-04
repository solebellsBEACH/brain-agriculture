import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropsService } from './crops.service';
import { CropsController } from './crop.controller';
import { Crop } from './entities/crop.entity';
import { Property } from '../properties/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crop, Property]),],
  controllers: [CropsController],
  providers: [CropsService],
})
export class CropModule { }
