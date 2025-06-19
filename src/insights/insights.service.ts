import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from '../producers/entities/producer.entity';
import { Property } from '../properties/entities/property.entity';
import { Crop } from '../crop/entities/crop.entity';

@Injectable()
export class InsightsService {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
  ) {}

  async getDashboard() {
    const totalFarms = await this.producerRepository.count();

    const properties = await this.propertyRepository.find();
    const totalHectares = properties.reduce(
      (sum, p) => sum + (p.total_area || 0),
      0,
    );

    const byState = properties.reduce(
      (acc, prop) => {
        acc[prop.state] = (acc[prop.state] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    const byStateArray = Object.entries(byState).map(([name, value]) => ({
      name,
      value,
    }));

    const crops = await this.cropRepository.find();
    const byCrop = crops.reduce(
      (acc, crop) => {
        acc[crop.name] = (acc[crop.name] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    const byCropArray = Object.entries(byCrop).map(([name, value]) => ({
      name,
      value,
    }));

    const landUse = properties.reduce(
      (acc, prop) => {
        acc.arable += prop.arable_area || 0;
        acc.vegetation += prop.vegetation_area || 0;
        return acc;
      },
      { arable: 0, vegetation: 0 },
    );

    return {
      totalFarms,
      totalHectares,
      byState: byStateArray,
      byCrop: byCropArray,
      landUse: [
        { name: 'Agricultável', value: landUse.arable },
        { name: 'Vegetação', value: landUse.vegetation },
      ],
    };
  }
}
