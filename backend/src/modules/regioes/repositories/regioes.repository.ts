import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Regioes } from '../entities/regioes.entity.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegioesRepository extends Repository<Regioes> {
  constructor(
    @InjectRepository(Regioes)
    private readonly repository: Repository<Regioes>,
  ) {
    super(Regioes, repository.manager, repository.queryRunner);
  }

  async findQueryRaw(){
    return this.manager?.query(`select id,nome from regioes;`)
  }
}
