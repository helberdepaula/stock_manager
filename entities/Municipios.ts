import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Enderecos } from "./Enderecos";
import { Estados } from "./Estados";

@Index("municipios_pkey", ["id"], { unique: true })
@Entity("municipios", { schema: "public" })
export class Municipios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nome", nullable: true, length: 50 })
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

  @OneToMany(() => Enderecos, (enderecos) => enderecos.municipio)
  enderecos: Enderecos[];

  @ManyToOne(() => Estados, (estados) => estados.municipios)
  @JoinColumn([{ name: "estado_id", referencedColumnName: "id" }])
  estado: Estados;
}
