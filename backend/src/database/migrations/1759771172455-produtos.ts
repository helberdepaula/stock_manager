import { MigrationInterface, QueryRunner } from "typeorm";

export class Produtos1759771172455 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.produtos
            (
                id SERIAL NOT NULL ,
                codigo character varying(255) COLLATE pg_catalog."default" NOT NULL,
                nome character varying(255) COLLATE pg_catalog."default" NOT NULL,
                descricao text COLLATE pg_catalog."default",
                categoria_id integer NOT NULL,
                user_id integer NOT null,
                unidade_id integer not null,
                marca_id integer not null,
                status TypeStatus NOT NULL DEFAULT 'ACTIVE',
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (codigo),
                CONSTRAINT produtos_pkey PRIMARY KEY (id),
                CONSTRAINT produto_users FOREIGN KEY(user_id)
                REFERENCES public.users (id) match simple
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID,
                CONSTRAINT produtos_categorias FOREIGN KEY (categoria_id)
                    REFERENCES public.categorias (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID,
                CONSTRAINT produtos_unidades FOREIGN KEY (unidade_id)
                    REFERENCES public.unidades (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID,
                CONSTRAINT produtos_marcas FOREIGN KEY (marca_id)
                    REFERENCES public.marcas (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID
             
            )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS produtos CASCADE;')
    }
}
