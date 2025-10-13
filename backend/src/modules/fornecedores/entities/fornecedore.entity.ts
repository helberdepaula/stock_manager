import { Enderecos } from 'src/modules/enderecos/entities/endereco.entity';
import { Estoques } from 'src/modules/estoques/entities/estoque.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContatoFornecedor } from './contato-fornecedor.entity';
;//import { ContatoFornecedor } from './ContatoFornecedor';

@Index('fornecedores_cnpj_key', ['cnpj'], { unique: true })
@Index('fornercedore_pkey', ['id'], { unique: true })
@Entity('fornecedores', { schema: 'public' })
export class Fornecedores {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character', { name: 'cnpj', unique: true, length: 14 })
  cnpj: string;

  @Column('character varying', { name: 'nome', nullable: true, length: 255 })
  nome: string | null;

  @Column('enum', {
    name: 'status',
    enum: ['ACTIVE', 'INACTIVE'],
    default: () => "'ACTIVE'",
  })
  status: 'ACTIVE' | 'INACTIVE';

  @Column('integer', {
    name: 'endereco_id',
  })
  endereco_id: number;

  @Column('timestamp with time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('timestamp with time zone', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @OneToMany(
    () => ContatoFornecedor,
    (contatoFornecedor) => contatoFornecedor.fornecedor,
  )
  contatoFornecedors: ContatoFornecedor[];

  @OneToMany(() => Estoques, (estoques) => estoques.fornecedor)
  estoques: Estoques[];

  @ManyToOne(() => Enderecos, (enderecos) => enderecos.fornecedores)
  @JoinColumn([{ name: 'endereco_id', referencedColumnName: 'id' }])
  endereco: Enderecos;
}
