
import { Estados } from 'src/modules/estados/entities/estado.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('regiao_pkey', ['id'], { unique: true })
@Index('regiao_nome_key', ['nome'], { unique: true })
@Entity('regioes', { schema: 'public' })

export class Regioes {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', {
    name: 'nome',
    nullable: true,
    unique: true,
    length: 255,
  })
  nome: string | null;

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

  @OneToMany(() => Estados, (estados) => estados.regiao)
  estados: Estados[];
}
