import { MigrationInterface, QueryRunner } from "typeorm";

export class ContatoFornecedor1759771626814 implements MigrationInterface {

 public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.contato_fornecedor
            (
                id SERIAL NOT NULL,
                fornecedor_id INTEGER NOT NULL,
                contato_id INTEGER NOT NULL,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT contato_fornecedor_pkey PRIMARY KEY (id),
                CONSTRAINT contato_fornecedor_to_fornecedor_fk FOREIGN KEY(fornecedor_id)
                REFERENCES public.fornecedores (id) match simple
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID,
                CONSTRAINT contato_fornecedor_to_contatos_fk FOREIGN KEY(contato_id)
                REFERENCES public.contatos (id) match simple
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID
            )
            TABLESPACE pg_default;
            ALTER TABLE IF EXISTS public.contato_fornecedor
                OWNER to postgres;
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS contato_fornecedor CASCADE;')
    }

}
