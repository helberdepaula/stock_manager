import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1759762673790 implements MigrationInterface {

 public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE  TABLE IF NOT EXISTS public.users 
            (
                id SERIAL not NULL,
                endereco_id INTEGER NOT NULL,
                nome character varying(255),
                email character varying(255),
                pwd character varying(255),
                recovery_code character varying(10),
                perfil typerules NOT NULL DEFAULT 'VENDEDOR',
                status TypeStatus NOT NULL DEFAULT 'ACTIVE',
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (email),
                CONSTRAINT users_pkey PRIMARY KEY (id),
                CONSTRAINT users_to_enderecos FOREIGN KEY(endereco_id)
                REFERENCES public.enderecos (id) match simple
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID
            )
            TABLESPACE pg_default;
            ALTER TABLE IF EXISTS public.users
                OWNER to postgres;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query('DROP TABLE IF EXISTS users CASCADE;')
    }

}
