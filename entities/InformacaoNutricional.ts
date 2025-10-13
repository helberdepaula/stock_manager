import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Produtos } from "./Produtos";

@Index("informacoes_nutri_pkey", ["id"], { unique: true })
@Index("informacao_nutricional_produto_id_key", ["produtoId"], { unique: true })
@Entity("informacao_nutricional", { schema: "public" })
export class InformacaoNutricional {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "produto_id", unique: true })
  produtoId: number;

  @Column("character varying", { name: "valor_energetico", length: 10 })
  valorEnergetico: string;

  @Column("character varying", { name: "carboidrato_g", length: 10 })
  carboidratoG: string;

  @Column("character varying", { name: "acucares_totais_g", length: 10 })
  acucaresTotaisG: string;

  @Column("character varying", { name: "proteinas_g", length: 10 })
  proteinasG: string;

  @Column("character varying", { name: "gorduras_totais_g", length: 10 })
  gordurasTotaisG: string;

  @Column("character varying", { name: "gorduras_saturadas_g", length: 10 })
  gordurasSaturadasG: string;

  @Column("character varying", { name: "gorduras_trans_g", length: 10 })
  gordurasTransG: string;

  @Column("character varying", { name: "fibras_alimentar_g", length: 10 })
  fibrasAlimentarG: string;

  @Column("character varying", { name: "sodio_mg", nullable: true, length: 10 })
  sodioMg: string | null;

  @Column("character varying", {
    name: "calcio_mg",
    nullable: true,
    length: 10,
  })
  calcioMg: string | null;

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

  @OneToOne(() => Produtos, (produtos) => produtos.informacaoNutricional)
  @JoinColumn([{ name: "produto_id", referencedColumnName: "id" }])
  produto: Produtos;
}
