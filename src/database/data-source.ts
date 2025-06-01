import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { Property } from '../properties/entities/property.entity';
import { Producer } from '../producers/entities/producer.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://postgres:postgres@localhost:5432/mydatabase',
  entities: [Property, Producer],
});
