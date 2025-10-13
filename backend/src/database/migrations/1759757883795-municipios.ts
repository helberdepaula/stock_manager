import { MigrationInterface, QueryRunner } from "typeorm";

export class Municipios1759757883795 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.municipios
                (
                    id SERIAL  NOT NULL,
                    nome CHARACTER varying(50),
                    estado_id INTEGER not NULL,
                    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT municipios_pkey PRIMARY KEY (id),
                    CONSTRAINT municipios_estados FOREIGN KEY (estado_id)
                    REFERENCES public.estados (id) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                        NOT VALID
                )
                TABLESPACE pg_default;
                ALTER TABLE IF EXISTS public.municipios
                    OWNER to postgres;
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS municipios CASCADE;')
    }

}
