import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contatos } from '../entities/contato.entity';

@Injectable()
export class ContatosRepository extends Repository<Contatos> {
  constructor(
    @InjectRepository(Contatos)
    private readonly repository: Repository<Contatos>,
  ) {
    super(Contatos, repository.manager, repository.queryRunner);
  }
}
