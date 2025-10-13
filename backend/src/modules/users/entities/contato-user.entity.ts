
import { Contatos } from "@modules/contatos/entities/contato.entity";
import { Users } from "./users.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";


@Index("contato_user_pkey", ["id"], { unique: true })
@Entity("contato_user", { schema: "public" })

export class ContatoUser {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

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

  @ManyToOne(() => Contatos, (contatos) => contatos.contatoUsers)
  @JoinColumn([{ name: "contato_id", referencedColumnName: "id" }])
  contato: Contatos;

  @ManyToOne(() => Users, (users) => users.contatoUsers)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
