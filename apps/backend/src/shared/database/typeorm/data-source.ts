import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'sa',
  password: 'SqlServerP@ssword1',
  database: 'model',
  entities: [
    'dist/**/*.entity{.ts,.js}',
  ],
  migrations: ['dist/database/migrations/*.js'],
  extra: {
    trustServerCertificate: true,
  },
  synchronize: true,
};

export const dataSource = new DataSource(dataSourceOptions);