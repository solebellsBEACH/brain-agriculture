import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import { getDbConfig } from './config';

dotenv.config();

export const AppDataSource = new DataSource(getDbConfig() as DataSourceOptions);
