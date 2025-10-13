import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContatoFornecedor } from "./ContatoFornecedor";
import { ContatoUser } from "./ContatoUser";

@Index("contato_pkey", ["id"], { unique: true })
@Entity("contatos", { schema: "public" })
export class Contatos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character", { name: "codigo", nullable: true, length: 3 })
  codigo: string | null;

  @Column("character", { name: "ddd", nullable: true, length: 3 })
  ddd: string | null;

  @Column("character varying", { name: "numero", nullable: true, length: 20 })
  numero: string | null;

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

  @OneToMany(
    () => ContatoFornecedor,
    (contatoFornecedor) => contatoFornecedor.contato
  )
  contatoFornecedors: ContatoFornecedor[];

  @OneToMany(() => ContatoUser, (contatoUser) => contatoUser.contato)
  contatoUsers: ContatoUser[];
}
