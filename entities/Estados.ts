import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Regioes } from "./Regioes";
import { Municipios } from "./Municipios";

@Index("estados_pkey", ["id"], { unique: true })
@Index("estados_uf_nome_key", ["nome", "uf"], { unique: true })
@Entity("estados", { schema: "public" })
export class Estados {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("character varying", {
    name: "nome",
    nullable: true,
    unique: true,
    length: 50,
  })
  nome: string | null;

  @Column("character", { name: "uf", nullable: true, unique: true, length: 2 })
  uf: string | null;

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

  @ManyToOne(() => Regioes, (regioes) => regioes.estados)
  @JoinColumn([{ name: "regiao_id", referencedColumnName: "id" }])
  regiao: Regioes;

  @OneToMany(() => Municipios, (municipios) => municipios.estado)
  municipios: Municipios[];
}
