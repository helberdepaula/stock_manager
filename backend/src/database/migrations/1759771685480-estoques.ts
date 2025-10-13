import { MigrationInterface, QueryRunner } from "typeorm";

export class Estoques1759771685480 implements MigrationInterface {

 public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
               CREATE TABLE IF NOT EXISTS public.estoques
                (
                    id SERIAL NOT NULL,
                    produto_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    fornecedor_id INTEGER NOT NULL,
                    corredor character varying(50) COLLATE pg_catalog."default" NOT NULL,
                    prateleira character varying(50) COLLATE pg_catalog."default" NOT NULL,
                    secao character varying(50) COLLATE pg_catalog."default" NOT NULL,
                    sku character varying(50) COLLATE pg_catalog."default" NOT NULL,
                    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
                    preco_custo NUMERIC NOT NULL CHECK (preco_custo > 0),
                    data_vencimento DATE NOT NULL,
                    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT estoque_pkey PRIMARY KEY (id),
                    CONSTRAINT estoque_to_produto_fk FOREIGN KEY(produto_id)
                    REFERENCES public.produtos (id) match simple
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                        NOT VALID,
                    CONSTRAINT estoque_to_user_fk FOREIGN KEY(user_id)
                    REFERENCES public.users (id) match simple
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                        NOT VALID,
                CONSTRAINT estoque_to_fornecedores_fk FOREIGN KEY(fornecedor_id)
                    REFERENCES public.fornecedores (id) match simple
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                        NOT VALID
                )
                TABLESPACE pg_default;
                ALTER TABLE IF EXISTS public.estoques
                 OWNER to postgres;
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.query('DROP TABLE IF EXISTS estoques CASCADE;')
    }
}
