import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Users } from "@modules/users/entities/users.entity";
import { Estoques } from "@modules/estoques/entities/estoque.entity";
import { Marcas } from "@modules/marcas/entities/marca.entity";
import { Unidades } from "@modules/unidades/entities/unidades.entity";
import { CategoriasEntity } from "@modules/categorias/entities/categoria.entity";
import { InformacaoNutricional } from "@modules/produtos/entities/informacao.nutricional.entity";
import { PedidoItens } from "@modules/pedidos/entities/pedido.iten.entity";

@Index("produtos_codigo_key", ["codigo"], { unique: true })
@Index("produtos_pkey", ["id"], { unique: true })
@Entity("produtos", { schema: "public" })
export class Produtos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "codigo", unique: true, length: 255 })
  codigo: string;

  @Column("character varying", { name: "nome", length: 255 })
  nome: string;

  @Column("text", { name: "descricao", nullable: true })
  descricao: string | null;

  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp with time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @OneToMany(() => Estoques, (estoques) => estoques.produto)
  estoques: Estoques[];

  @OneToOne(
    () => InformacaoNutricional,
    (informacaoNutricional) => informacaoNutricional.produto
  )
  informacaoNutricional: InformacaoNutricional;

  @OneToMany(() => PedidoItens, (pedidoItens) => pedidoItens.produto)
  pedidoItens: PedidoItens[];

  @ManyToOne(() => CategoriasEntity, (categorias) => categorias.produtos)
  @JoinColumn([{ name: "categoria_id", referencedColumnName: "id" }])
  categoria: CategoriasEntity;

  @ManyToOne(() => Marcas, (marcas) => marcas.produtos)
  @JoinColumn([{ name: "marca_id", referencedColumnName: "id" }])
  marca: Marcas;

  @ManyToOne(() => Unidades, (unidades) => unidades.produtos)
  @JoinColumn([{ name: "unidade_id", referencedColumnName: "id" }])
  unidade: Unidades;

  @ManyToOne(() => Users, (users) => users.produtos)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
