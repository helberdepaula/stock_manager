import { MigrationInterface, QueryRunner } from "typeorm";

export class Contatos1759761805915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.contatos
            (
                id SERIAL NOT NULL,
                codigo CHAR(3) ,
                ddd CHAR(3),
                numero CHARACTER varying(20),
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT contato_pkey PRIMARY KEY (id)
            )
            TABLESPACE pg_default;
            ALTER TABLE IF EXISTS public.contatos
                OWNER to postgres;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query('DROP TABLE IF EXISTS contatos CASCADE;')
    }

}
