import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Produtos } from "./Produtos";

@Index("marca_pkey", ["id"], { unique: true })
@Index("marcas_nome_key", ["nome"], { unique: true })
@Entity("marcas", { schema: "public" })
export class Marcas {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nome", unique: true, length: 100 })
  nome: string;

  @Column("enum", {
    name: "status",
    enum: ["ACTIVE", "INACTIVE"],
    default: () => "'ACTIVE'",
  })
  status: "ACTIVE" | "INACTIVE";

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

  @OneToMany(() => Produtos, (produtos) => produtos.marca)
  produtos: Produtos[];
}
