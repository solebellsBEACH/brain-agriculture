import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'postgres',
  host: 'aws-0-sa-east-1.pooler.supabase.com',
  port: 6543,
  username: 'postgres.hbnnmcpgywrodubydium',
  password: 'brain-agr',
  database: 'postgres',
  synchronize: true,
  ssl: {
    rejectUnauthorized: false, // necessário para conexão segura com Supabase
  },
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
