import { Inject, Injectable } from '@nestjs/common';
import { Lead } from './entities/lead.entity';
import { Repository } from 'typeorm';
import { Status } from './enums/status.enum';
import { EmailService } from 'src/services/send-email/email.service';

@Injectable()
export class LeadsService {
  constructor(
    @Inject('LEAD_REPOSITORY')
    private leadRepository: Repository<Lead>,
    private readonly emailService: EmailService,
  ) {}

  async findOne(id: number) {
    return await this.leadRepository.findOne({
      where: {
        id,
      }
    });
  }

  async findAll(status: Status) {
    return await this.leadRepository.find({
      where: {
        status,
      }
    });
  }

  updateStatus(id: number, status: Status) {
    return this.leadRepository.update(id, {
      status: status,
    });
  }

  update(id: number, values: Partial<Lead>) {
    return this.leadRepository.update(id, {
      ...values,
    });
  }

  applyDiscount(id: number, price: number, percent: number, minPrice: number, status: Status) {
    if (status !== Status.ACCEPTED || price < minPrice) {
      return;
    }
    return this.leadRepository.update(id, {
      price: price - (price * percent / 100),
    });
  }

  sendEmailNotificaton(lead: Lead, status: Status) {
    if (status !== Status.ACCEPTED) {
      return;
    }

    this.emailService.send(
      'vendas@teste.com',
      'Convite atualizado',
      `O convite com ID ${lead.id} foi aceito`
    );
  }
}
