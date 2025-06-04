import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { Status } from './enums/status.enum';
import { EmailService } from 'src/services/send-email/email.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}
  @Get()
  findAll(@Query('status') statusString: string) {
    const status = Status[statusString.toUpperCase()];
    return this.leadsService.findAll(status);
  }

  @Patch(':id')
  async updateStatus(@Param('id') id: string, @Body('status') statusString: string) {
    const lead = await this.leadsService.findOne(+id);

    if (!lead) {
      throw new Error(`Lead with ID ${id} not found`);
    }

    const status = Status[statusString.toUpperCase()];
    await this.leadsService.applyDiscount(+id, lead.price, 10, 500, status);
    await this.leadsService.updateStatus(+id, status);

    this.leadsService.sendEmailNotificaton(lead, status);
  }
}
