import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContatoFornecedor } from '../entities/contato-fornecedor.entity';
import { Contatos } from '@app/modules/contatos/entities/contato.entity';

@Injectable()
export class ContatoFornecedorRepository extends Repository<ContatoFornecedor> {
  constructor(
    @InjectRepository(ContatoFornecedor)
    private readonly repository: Repository<ContatoFornecedor>,
  ) {
    super(ContatoFornecedor, repository.manager, repository.queryRunner);
  }

  async findAll(fornecedor_id: number) {
    return this.repository.find({
      where: { fornecedor_id },
      relations: ['contato'],
    });
  }
}
