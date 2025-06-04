import { Status } from "src/leads/enums/status.enum";
import { MigrationInterface, QueryRunner } from "typeorm";

const data = [
  {
    contactFirstName: 'Bill',
    contactLastName: 'Rogers',
    contactPhoneNumber: '+1234567890',
    contactEmail: 'bill.rogers@test.com',
    contactAddress: 'Miami, FL 33101',
    category: 'Painters',
    description: 'Need to paint 2 aluminum windows and sliding a glass door',
    price: 500 * 100,
  },
  {
    contactFirstName: 'Craig',
    contactLastName: 'Washington',
    contactPhoneNumber: '+55711234567',
    contactEmail: 'craig.washigton@test.com',
    contactAddress: 'New York, NY 10001',
    category: 'Interior Painters',
    description: 'Internal walls 3 colors',
    price: 350 * 100,
  },
  {
    contactFirstName: 'Thomas',
    contactLastName: 'Jefferson',
    contactPhoneNumber: '+55111234567',
    contactEmail: 'thomas.jefferson@test.com',
    contactAddress: 'Yanderra 2574',
    category: 'Engineering',
    description: 'Building a new bridge',
    price: 699.99 * 100,
  },
];

export class InsertInitialData1749038084339 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        INSERT INTO "leads" (
            "contact_first_name",
            "contact_last_name",
            "contact_phone_number",
            "contact_email",
            "contact_address",
            "category",
            "description",
            "price",
            "created_at",
            "status"
        ) VALUES
          ${data
            .map(
              (lead: any) =>
                `(${Object.values(lead)
                  .map((value) => `'${value}'`)
                  .join(', ')}, CURRENT_TIMESTAMP, ${Status.PENDING})`,
            )
            .join(',\n')}
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "leads"`);
  }

}
