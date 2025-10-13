import { MigrationInterface, QueryRunner } from "typeorm";

export class Unidade1759767937109 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.unidades
            (
                id SERIAL  NOT NULL,
                nome CHARACTER VARYING(100) COLLATE pg_catalog."default" NOT NULL,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT unidade_pkey PRIMARY KEY (id),
                UNIQUE (nome)
            )
            TABLESPACE pg_default;
            ALTER TABLE IF EXISTS public.unidades
                OWNER to postgres;
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS unidades CASCADE;')
    }

}
