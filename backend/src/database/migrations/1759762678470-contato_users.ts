import { MigrationInterface, QueryRunner } from "typeorm";

export class ContatoUsers1759762678470 implements MigrationInterface {

 public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS public.contato_user
        (
            id SERIAL NOT NULL,
            user_id INTEGER NOT NULL,
            contato_id INTEGER NOT NULL,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT contato_user_pkey PRIMARY KEY (id),
            CONSTRAINT contato_user_to_users_fk FOREIGN KEY(user_id)
            REFERENCES public.users (id) match simple
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
                NOT VALID,
            CONSTRAINT contato_user_to_contatos_fk FOREIGN KEY(contato_id)
            REFERENCES public.contatos (id) match simple
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
                NOT VALID
        )
        TABLESPACE pg_default;
        ALTER TABLE IF EXISTS public.contato_user
            OWNER to postgres;
   
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query('DROP TABLE IF EXISTS contato_user CASCADE;')
    }

}
