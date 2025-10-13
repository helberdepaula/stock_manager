import { MigrationInterface, QueryRunner } from "typeorm";

export class InformacaoNutricional1759771214082 implements MigrationInterface {

public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.informacao_nutricional
            (
                id SERIAL NOT NULL ,
                produto_id integer not null,
                valor_energetico character varying(10) NOT NULL,
                carboidrato_g character varying(10) NOT NULL,
                acucares_totais_g character varying(10) NOT NULL,
                proteinas_g character varying(10) NOT NULL,
                gorduras_totais_g character varying(10) NOT NULL,
                gorduras_saturadas_g character varying(10) NOT NULL,
                gorduras_trans_g character varying(10) NOT NULL,
                fibras_alimentar_g character varying(10) NOT NULL,
                sodio_mg character varying (10) NULL,
                calcio_mg character varying(10) NULL,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (produto_id),
                CONSTRAINT informacoes_nutri_pkey PRIMARY KEY (id),
                CONSTRAINT informacoes_nutri_to_produtos FOREIGN KEY (produto_id)
                REFERENCES public.produtos (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID
                
            )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query('DROP TABLE IF EXISTS informacao_nutricional CASCADE;')
    }

}
