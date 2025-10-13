import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Municipios } from "./Municipios";
import { Fornecedores } from "./Fornecedores";
import { Users } from "./Users";

@Index("enderecos_pkey", ["id"], { unique: true })
@Entity("enderecos", { schema: "public" })
export class Enderecos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "logradouro",
    nullable: true,
    length: 50,
  })
  logradouro: string | null;

  @Column("character varying", { name: "cep", nullable: true, length: 30 })
  cep: string | null;

  @Column("character varying", { name: "numero", nullable: true, length: 20 })
  numero: string | null;

  @Column("character varying", {
    name: "complemento",
    nullable: true,
    length: 255,
  })
  complemento: string | null;

  @Column("character varying", { name: "bairro", nullable: true, length: 255 })
  bairro: string | null;

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

  @ManyToOne(() => Municipios, (municipios) => municipios.enderecos)
  @JoinColumn([{ name: "municipio_id", referencedColumnName: "id" }])
  municipio: Municipios;

  @OneToMany(() => Fornecedores, (fornecedores) => fornecedores.endereco)
  fornecedores: Fornecedores[];

  @OneToMany(() => Users, (users) => users.endereco)
  users: Users[];
}
