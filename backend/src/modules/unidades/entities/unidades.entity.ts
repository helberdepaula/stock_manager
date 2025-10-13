import { Produtos } from "@modules/produtos/entities/produto.entity";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Index("unidade_pkey", ["id"], { unique: true })
@Index("unidades_nome_key", ["nome"], { unique: true })
@Entity("unidades", { schema: "public" })
export class Unidades {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nome", unique: true, length: 100 })
  nome: string;

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

  @OneToMany(() => Produtos, (produtos) => produtos.unidade)
  produtos: Produtos[];
}
