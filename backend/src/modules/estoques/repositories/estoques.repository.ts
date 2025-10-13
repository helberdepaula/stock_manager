import { Raw, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estoques } from '../entities/estoque.entity';
import { SearchEstoqueDto } from '../dto/searchEstoque.dtos';

@Injectable()
export class EstoquesRepository extends Repository<Estoques> {
  constructor(
    @InjectRepository(Estoques)
    private readonly repository: Repository<Estoques>,
  ) {
    super(Estoques, repository.manager, repository.queryRunner);
  }

  async findByPK(id: number): Promise<Estoques | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findAllPagination(
    filter: SearchEstoqueDto,
  ): Promise<[Estoques[], number]> {
    const limit = Number(process.env.LIMIT_PAGINATION) || 0;
    const whereParam: any = { status: 'ACTIVE' };

    if (filter.nome) {
      whereParam.nome = Raw((alias) => `${alias} ILIKE '%${filter.nome}%'`);
    }

    const offset =
      (Number(filter?.page) - 1 || 1 - 1) * Number(filter.limit || limit);
    return await this.repository.findAndCount({
      where: whereParam,
      take: filter.limit || limit,
      skip: offset ?? 0,
    });
  }
}
