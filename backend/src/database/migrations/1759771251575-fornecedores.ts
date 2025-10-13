import { MigrationInterface, QueryRunner } from 'typeorm';

export class Fornecedores1759771251575 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.fornecedores
            (
                id SERIAL NOT NULL,
                cnpj CHAR(14) NOT NULL,
                nome character varying(255),
                endereco_id INTEGER NOT NULL,
                status TypeStatus NOT NULL DEFAULT 'ACTIVE',
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (cnpj),
                CONSTRAINT fornercedore_pkey PRIMARY KEY (id),
                CONSTRAINT fornecedores_to_enderecos_fk FOREIGN KEY(endereco_id)
                REFERENCES public.enderecos (id) match simple
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID
            )
            TABLESPACE pg_default;
            ALTER TABLE IF EXISTS public.fornecedores
            OWNER to postgres;
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS fornecedores CASCADE;');
  }
}
