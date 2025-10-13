import { MigrationInterface, QueryRunner } from "typeorm";

export class Enderecos1759761692656 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.enderecos
            (
                id SERIAL NOT NULL,
                logradouro CHARACTER varying(50),
                cep CHARACTER varying (30),
                numero CHARACTER varying(20),
                complemento CHARACTER varying(255),
                bairro CHARACTER varying(255),
                municipio_id INTEGER not NULL,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT enderecos_pkey PRIMARY KEY (id),
                CONSTRAINT enderecos_municipios FOREIGN key(municipio_id)
                REFERENCES public.municipios (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID
            )
            TABLESPACE pg_default;
            ALTER TABLE IF EXISTS public.enderecos
                OWNER to postgres;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.query('DROP TABLE IF EXISTS enderecos CASCADE;')
    }

}
