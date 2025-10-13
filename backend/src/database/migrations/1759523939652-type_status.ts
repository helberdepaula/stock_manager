import { MigrationInterface, QueryRunner } from 'typeorm';

export class TypeStatus1759523939652 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE TypeStatus AS ENUM ('ACTIVE', 'INACTIVE')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TYPE IF EXISTS TypeStatus CASCADE;
   `);
  }
}
