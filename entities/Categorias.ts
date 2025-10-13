import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Produtos } from "./Produtos";

@Index("categoria_pkey", ["id"], { unique: true })
@Index("categorias_nome_key", ["nome"], { unique: true })
@Entity("categorias", { schema: "public" })
export class Categorias {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "nome",
    nullable: true,
    unique: true,
    length: 100,
  })
  nome: string | null;

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

  @OneToMany(() => Produtos, (produtos) => produtos.categoria)
  produtos: Produtos[];
}
