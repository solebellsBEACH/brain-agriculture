import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { Property } from '../properties/entities/property.entity';


dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'mydatabase',
    entities: [Property],
});
