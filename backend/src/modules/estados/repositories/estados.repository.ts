import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estados } from '../entities/estado.entity';

@Injectable()
export class EstadosRepository extends Repository<Estados> {
  constructor(
    @InjectRepository(Estados)
    private readonly repository: Repository<Estados>,
  ) {
    super(Estados, repository.manager, repository.queryRunner);
  }

  async findAll() {
    return this.repository.find({ select: { id: true, nome: true } });
  }
}
