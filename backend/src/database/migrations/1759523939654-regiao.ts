import { MigrationInterface, QueryRunner } from "typeorm";

export class Regiao1759523939654 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(` 
       CREATE TABLE IF NOT EXISTS public.regioes
        (
            id SERIAL  NOT NULL,
            nome CHARACTER varying(100),
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (nome),
            CONSTRAINT regiao_pkey PRIMARY KEY (id)
        )
        TABLESPACE pg_default;
        ALTER TABLE IF EXISTS public.regioes
            OWNER to postgres;
`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS regiao CASCADE;')
    }

}
