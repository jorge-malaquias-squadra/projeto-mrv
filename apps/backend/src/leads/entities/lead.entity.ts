import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../enums/status.enum';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'contact_first_name'})
  contactFirstName: string;

  @Column({name: 'contact_last_name'})
  contactLastName: string;

  @Column({name: 'contact_phone_number'})
  contactPhoneNumber: string;

  @Column({name: 'contact_email'})
  contactEmail: string;

  @Column({name: 'contact_address', nullable: true})
  contactAddress: string;

  @Column({name: 'category'})
  category: string;

  @Column({name: 'description'})
  description: string;

  @Column({name: 'price'})
  price: number;

  @Column({name: 'created_at', type: 'datetime2', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: string;

  @Column({name: 'status', type: 'varchar', enum: Status, default: Status.PENDING})
  status: Status;
}
