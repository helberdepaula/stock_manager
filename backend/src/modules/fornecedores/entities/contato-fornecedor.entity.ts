
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Fornecedores } from './fornecedore.entity';
import { Contatos } from '@modules/contatos/entities/contato.entity';

@Index('contato_fornecedor_pkey', ['id'], { unique: true })
@Entity('contato_fornecedor', { schema: 'public' })
export class ContatoFornecedor {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp with time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('integer', {
    name: 'fornecedor_id',
  })
  fornecedor_id: number;

  @Column('timestamp with time zone', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @ManyToOne(() => Contatos, (contatos) => contatos.contatoFornecedors)
  @JoinColumn([{ name: 'contato_id', referencedColumnName: 'id' }])
  contato: Contatos;

  @ManyToOne(
    () => Fornecedores,
    (fornecedores) => fornecedores.contatoFornecedors,
  )
  @JoinColumn([{ name: 'fornecedor_id', referencedColumnName: 'id' }])
  fornecedor: Fornecedores;
}
