import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupMigration1749036624336 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return;
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "leads"
      (
        "id" INT IDENTITY(1,1) PRIMARY KEY,
        "contact_first_name" VARCHAR(100) NOT NULL,
        "contact_last_name" VARCHAR(100) NOT NULL,
        "contact_phone_number" VARCHAR(30) NOT NULL,
        "contact_email" VARCHAR(255) NOT NULL,
        "category" VARCHAR(100) NOT NULL,
        "description" TEXT NOT NULL,
        "created_at" DATETIME2(3) DEFAULT CURRENT_TIMESTAMP,
        "price" int NOT NULL DEFAULT 0,
        "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
        CONSTRAINT "UQ_835baad60041a3413f9ef95bc07" UNIQUE ("id"),
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "leads"`);
    await queryRunner.query(`DROP TABLE "leads"`);
  }

}
