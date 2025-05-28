import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'lucas',
  password: 'minha_senha_segura',
  database: 'meu_banco',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
