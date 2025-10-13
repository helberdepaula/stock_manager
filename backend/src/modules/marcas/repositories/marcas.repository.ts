import { Not, Raw, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Marcas } from '../entities/marca.entity';
import { CreateMarcaDto } from '../dto/create-marca.dto';
import { UpdateMarcaDto } from '../dto/update-marca.dto';
import { MarcasSearchDto } from '../dto/marcasSearch.dtos';

@Injectable()
export class MarcasRepository extends Repository<Marcas> {
  constructor(
    @InjectRepository(Marcas)
    private readonly repository: Repository<Marcas>,
  ) {
    super(Marcas, repository.manager, repository.queryRunner);
  }

  async findByName(name: string): Promise<Marcas | null> {
    return this.repository.findOne({
      where: { nome: name },
    });
  }

  async findByNameISNOT(id: number, name: string): Promise<Marcas | null> {
    return this.repository.findOne({
      where: { id: Not(id), nome: Raw((alias) => `${alias} ILIKE '%${name}%'`) },
    });
  }

  async findByPK(id: number): Promise<Marcas | null> {
    return this.repository.findOne({
      where: { id, status: 'ACTIVE' },
    });
  }

  async findAllPagination(
    filter: MarcasSearchDto,
  ): Promise<[Marcas[], number]> {
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

  async findAll(filter: MarcasSearchDto): Promise<Marcas[]> {
    const limit = Number(process.env.LIMIT_PAGINATION) || 0;

    const whereParam: any = { status: 'ACTIVE' };

    if (filter.nome) {
      whereParam.nome = Raw((alias) => `${alias} ILIKE '%${filter.nome}%'`);
    }
    return this.repository.find({
      where: whereParam,
    });
  }

  async createNew(data: CreateMarcaDto): Promise<Marcas | null> {
    return this.repository.save({
      nome: data.nome,
    });
  }

  async updateCustom(id: number, data: UpdateMarcaDto): Promise<any> {
    return this.repository.save({
      id: id,
      nome: data.nome,
    });
  }

  async softDeleteCustom(id: number) {

    return this.repository.save({
      id: id,
      status: 'INACTIVE',
    });
  }
}
