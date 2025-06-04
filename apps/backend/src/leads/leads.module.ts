import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { leadProviders } from 'src/shared/database/typeorm/lead.providers';
import { DatabaseModule } from 'src/shared/database/typeorm/database.module';
import { EmailService } from 'src/services/send-email/email.service';
// import { leadsProviders } from 'src/shared/database/mongoose/lead/lead.provider';
// import { databaseProviders } from 'src/shared/database/mongoose/database.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [LeadsController],
  providers: [...leadProviders, LeadsService, EmailService],
  // exports: [...databaseProviders],
})
export class LeadsModule {}
