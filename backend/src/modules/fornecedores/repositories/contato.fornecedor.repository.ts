import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContatoFornecedor } from '../entities/contato-fornecedor.entity';

@Injectable()
export class ContatoFornecedorRepository extends Repository<ContatoFornecedor> {
  constructor(
    @InjectRepository(ContatoFornecedor)
    private readonly repository: Repository<ContatoFornecedor>,
  ) {
    super(ContatoFornecedor, repository.manager, repository.queryRunner);
  }

}
