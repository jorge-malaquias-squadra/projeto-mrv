import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/database/mongoose/database.module';
import { LeadsModule } from './leads/leads.module';
import { EmailService } from './services/send-email/email.service';
@Module({
  imports: [
    DatabaseModule,
    LeadsModule,
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   host: 'localhost',
    //   port: 27017,
    //   username: 'admin',
    //   password: 'admin',
    //   database: 'app',
    //   // entities: ['src/resources/**/*.entity.ts'],
    //   synchronize: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
