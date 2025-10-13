import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estoques } from "./Estoques";
import { Pedidos } from "./Pedidos";
import { Produtos } from "./Produtos";
import { Users } from "./Users";

@Entity("pedido_itens", { schema: "public" })
export class PedidoItens {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "quantidade" })
  quantidade: number;

  @Column("numeric", { name: "preco_custo" })
  precoCusto: string;

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

  @ManyToOne(() => Estoques, (estoques) => estoques.pedidoItens)
  @JoinColumn([{ name: "estoque_id", referencedColumnName: "id" }])
  estoque: Estoques;

  @ManyToOne(() => Pedidos, (pedidos) => pedidos.pedidoItens)
  @JoinColumn([{ name: "pedido_id", referencedColumnName: "id" }])
  pedido: Pedidos;

  @ManyToOne(() => Produtos, (produtos) => produtos.pedidoItens)
  @JoinColumn([{ name: "produto_id", referencedColumnName: "id" }])
  produto: Produtos;

  @ManyToOne(() => Users, (users) => users.pedidoItens)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
