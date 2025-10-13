import { MigrationInterface, QueryRunner } from "typeorm";

export class Categorias1759763110382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.categorias
            (
                id SERIAL NOT NULL ,
                nome character varying(100) COLLATE pg_catalog."default",
                UNIQUE (nome),
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT categoria_pkey PRIMARY KEY (id)
            )
            TABLESPACE pg_default;
            ALTER TABLE IF EXISTS public.categorias
                OWNER to postgres;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.query('DROP TABLE IF EXISTS categorias CASCADE;')
    }

}
