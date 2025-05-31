import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { Property } from '../properties/entities/property.entity';


dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: "postgres://postgres:postgres@localhost:5432/mydatabase",
    entities: [Property],
});
