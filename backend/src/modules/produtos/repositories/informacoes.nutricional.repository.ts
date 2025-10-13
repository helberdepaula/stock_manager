import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InformacaoNutricional } from '../../produtos/entities/informacao.nutricional.entity';

@Injectable()
export class InformacoesNutricionalRepository extends Repository<InformacaoNutricional> {
  constructor(
    @InjectRepository(InformacaoNutricional)
    private readonly repository: Repository<InformacaoNutricional>,
  ) {
    super(InformacaoNutricional, repository.manager, repository.queryRunner);
  }
}
