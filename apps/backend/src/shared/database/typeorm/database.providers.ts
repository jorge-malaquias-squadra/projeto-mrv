
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './data-source';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(dataSourceOptions);
      return dataSource.initialize();
    },
  },
];
