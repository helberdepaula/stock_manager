import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PedidoItens } from "./pedido.iten.entity";

@Index("pedido_pkey", ["id"], { unique: true })
@Entity("pedidos", { schema: "public" })
export class Pedidos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "user_id" })
  userId: number;

  @Column("numeric", { name: "valor_total" })
  valorTotal: string;

  @Column("date", { name: "data_venda", nullable: true })
  dataVenda: string | null;

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

  @OneToMany(() => PedidoItens, (pedidoItens) => pedidoItens.pedido)
  pedidoItens: PedidoItens[];
}
