import { MigrationInterface, QueryRunner } from "typeorm";

export class Estados1759524839370 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.estados
                (
                    id INTEGER  NOT NULL,
                    nome CHARACTER varying(50),
                    uf CHAR(2),
                    regiao_id INTEGER NOT NULL,
                    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE (uf,nome),
                    CONSTRAINT estados_pkey PRIMARY KEY (id),
                    CONSTRAINT estados_regioes FOREIGN KEY (regiao_id)
                    REFERENCES public.regioes (id) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                        NOT VALID
                )
                TABLESPACE pg_default;
                ALTER TABLE IF EXISTS public.estados
                OWNER to postgres;
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.query('DROP TABLE IF EXISTS estados CASCADE;')
    }

}
