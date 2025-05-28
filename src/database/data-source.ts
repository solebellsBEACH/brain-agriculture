import { config } from 'src/ormconfig';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(config);
