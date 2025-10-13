import { MigrationInterface, QueryRunner } from "typeorm";

export class TypeRoler1759523939653 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(` 
            CREATE TYPE TypeRules AS ENUM ('ADMIN', 'VENDEDOR');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TYPE IF EXISTS TypeRules CASCADE;
        `);
    }

}
