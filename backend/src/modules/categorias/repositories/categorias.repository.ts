import { Raw, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriasEntity } from '../entities/categoria.entity';
import { CategoriaSearchDto } from '../dto/cagoriaSearch.dtos';

@Injectable()
export class CategoriasRepository extends Repository<CategoriasEntity> {
  constructor(
    @InjectRepository(CategoriasEntity)
    private readonly repository: Repository<CategoriasEntity>,
  ) {
    super(CategoriasEntity, repository.manager, repository.queryRunner);
  }

  async findByPK(id: number): Promise<CategoriasEntity | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findAllPagination(
    filter: CategoriaSearchDto,
  ): Promise<[CategoriasEntity[], number]> {
    const limit = Number(process.env.LIMIT_PAGINATION) || 0;

    const whereParam: any = {
      /*status: 'ACTIVE'*/
    };

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

  async findAll(filter: CategoriaSearchDto) {
    const whereParam: any = {
      /*status: 'ACTIVE'*/
    };

    if (filter.nome) {
      whereParam.nome = Raw((alias) => `${alias} ILIKE '%${filter.nome}%'`);
    }

    return this.repository.find({ where: whereParam });
  }
}
