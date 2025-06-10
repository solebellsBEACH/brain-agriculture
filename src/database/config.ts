import { Property } from '../properties/entities/property.entity';
import { Producer } from '../producers/entities/producer.entity';
import { Crop } from '../crop/entities/crop.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

export enum NodeENV {
  test = 'test',
  dev = 'development',
  prod = 'production',
}

dotenv.config({
  path: `.env.${(process.env.NODE_ENV as NodeENV) || NodeENV.dev}`,
});

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Property, Producer, Crop],
};
export function getDbConfig() {
  if (process.env.NODE_ENV === NodeENV.prod) {
    return {
      ...dbConfig,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }
  return {
    ...dbConfig,
    synchronize: true,
  };
}
