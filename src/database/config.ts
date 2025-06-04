import { Property } from '../properties/entities/property.entity';
import { Producer } from '../producers/entities/producer.entity';
import { Crop } from '../crop/entities/crop.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

export enum NodeENV {
    dev = 'development',
    prod = 'production'
}

dotenv.config({
    path: `.env.${process.env.NODE_ENV as NodeENV || NodeENV.dev}`,
});

const dbConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Property, Producer, Crop],
};
export function getDbConfig() {
    console.log(process.env.NODE_ENV, process.env.DATABASE_URL)
    if (process.env.NODE_ENV === NodeENV.dev) {
        return {
            ...dbConfig,
            synchronize: true,
        }
    }
    return {
        ...dbConfig,
        ssl: {
            rejectUnauthorized: false,
        }
    }
}
