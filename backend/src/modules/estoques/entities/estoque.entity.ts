import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Produtos } from "@modules/produtos/entities/produto.entity";
import { Users } from "@modules/users/entities/users.entity";
import { Fornecedores } from "@modules/fornecedores/entities/fornecedore.entity";
import { PedidoItens } from "@modules/pedidos/entities/pedido.iten.entity";

@Index("estoque_pkey", ["id"], { unique: true })
@Entity("estoques", { schema: "public" })
export class Estoques {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "corredor", length: 50 })
  corredor: string;

  @Column("character varying", { name: "prateleira", length: 50 })
  prateleira: string;

  @Column("character varying", { name: "secao", length: 50 })
  secao: string;

  @Column("character varying", { name: "sku", length: 50 })
  sku: string;

  @Column("integer", { name: "quantidade" })
  quantidade: number;

  @Column("numeric", { name: "preco_custo" })
  precoCusto: string;

  @Column("date", { name: "data_vencimento" })
  dataVencimento: string;

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

  @ManyToOne(() => Fornecedores, (fornecedores) => fornecedores.estoques)
  @JoinColumn([{ name: "fornecedor_id", referencedColumnName: "id" }])
  fornecedor: Fornecedores;

  @ManyToOne(() => Produtos, (produtos) => produtos.estoques)
  @JoinColumn([{ name: "produto_id", referencedColumnName: "id" }])
  produto: Produtos;

  @ManyToOne(() => Users, (users) => users.estoques)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => PedidoItens, (pedidoItens) => pedidoItens.estoque)
  pedidoItens: PedidoItens[];
}
