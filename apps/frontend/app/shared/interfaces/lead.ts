import { Status } from '../enums/status';

export interface Lead {
  id: number;

  contactFirstName: string;

  contactLastName: string;

  contactPhoneNumber: string;

  contactEmail: string;

  contactAddress: string;

  category: string;

  description: string;

  price: number;

  createdAt: string;

  status: Status;
}
