import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unidades } from '../entities/unidades.entity';

@Injectable()
export class UnidadesRepository extends Repository<Unidades> {
  constructor(
    @InjectRepository(Unidades)
    private readonly repository: Repository<Unidades>,
  ) {
    super(Unidades, repository.manager, repository.queryRunner);
  }

  async findByPK(id: number): Promise<Unidades | null> {
    return this.repository.findOne({
      where: { id,  },
    });
  }

  async findAll() {
    return this.repository.find({
      select: {
        id: true,
        nome: true,
      },
    });
  }
}
