import { MigrationInterface, QueryRunner } from 'typeorm';

export class Marcas1759767937103 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
           CREATE TABLE IF NOT EXISTS public.marcas
            (
                id SERIAL  NOT NULL,
                nome CHARACTER VARYING(100) COLLATE pg_catalog."default" NOT NULL,
                status TypeStatus NOT NULL DEFAULT 'ACTIVE',
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT marca_pkey PRIMARY KEY (id),
                UNIQUE (nome)
            )
            TABLESPACE pg_default;
            ALTER TABLE IF EXISTS public.marcas
                OWNER to postgres;
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS marcas CASCADE;');
  }
}
