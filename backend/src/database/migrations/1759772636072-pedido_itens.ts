import { MigrationInterface, QueryRunner } from "typeorm";

export class PedidoItens1759772636072 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.pedido_itens
            (
                id SERIAL NOT NULL,
                user_id INTEGER NOT NULL,
                pedido_id INTEGER NOT NULL,
                produto_id INTEGER NOT NULL,
                estoque_id INTEGER NOT NULL,
                quantidade INTEGER NOT NULL,
                preco numeric NOT NULL CHECK (preco > 0),
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT pedido_item_to_users_fk FOREIGN KEY(user_id)
                REFERENCES public.users (id) match simple
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID,
                CONSTRAINT pedido_itens_to_pedidos_fk FOREIGN KEY(pedido_id)
                REFERENCES public.pedidos (id) match simple
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID,
                CONSTRAINT pedido_item_to_produtos_fk FOREIGN KEY(produto_id)
                REFERENCES public.produtos (id) match simple
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID,
                CONSTRAINT pedido_item_to_estoque_fk FOREIGN KEY(estoque_id)
                REFERENCES public.estoques (id) match simple
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID

            )
            TABLESPACE pg_default;
            ALTER TABLE IF EXISTS public.pedido_itens
                OWNER to postgres;
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
           await queryRunner.query('DROP TABLE IF EXISTS pedido_itens CASCADE;')
    }

}
