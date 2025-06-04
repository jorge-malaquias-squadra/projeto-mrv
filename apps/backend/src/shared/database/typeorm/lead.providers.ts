
import { Lead } from 'src/leads/entities/lead.entity';
import { DataSource } from 'typeorm';

export const leadProviders = [
  {
    provide: 'LEAD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Lead),
    inject: ['DATA_SOURCE'],
  },
];
