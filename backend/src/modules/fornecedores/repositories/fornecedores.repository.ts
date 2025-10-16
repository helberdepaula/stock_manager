import { Raw, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fornecedores } from '../entities/fornecedore.entity';
import { CreateFornecedoreDto } from '../dto/create-fornecedore.dto';
import { UpdateFornecedoreDto } from '../dto/update-fornecedore.dto';
import { SearchFornecedoreDto } from '../dto/search-fornecedore.dto';
import { Enderecos } from 'src/modules/enderecos/entities/endereco.entity';

@Injectable()
export class FornecedoresRepository extends Repository<Fornecedores> {
  constructor(
    @InjectRepository(Fornecedores)
    private readonly repository: Repository<Fornecedores>,
  ) {
    super(Fornecedores, repository.manager, repository.queryRunner);
  }

  async findByCNPJ(cpnj: string): Promise<Fornecedores | null> {
    return this.repository.findOne({
      relations: ['endereco'],
      where: { cnpj: cpnj.replace(/\D/g, '') },
    });
  }

  async findByPK(id: number): Promise<Fornecedores | null> {
    return this.repository.findOne({
      relations: [
        'endereco',
        'endereco.municipio',
        'endereco.municipio.estado',
      ],
      where: { id, status: 'ACTIVE' },
    });
  }

  async findAllPagination(
    filter: SearchFornecedoreDto,
  ): Promise<[Fornecedores[], number]> {
    const limit = Number(process.env.LIMIT_PAGINATION) || 0;
    const whereParam: any = { status: 'ACTIVE' };

    if (filter.cnpj) {
      whereParam.cnpj = filter.cnpj?.replace(/\D/g, '');
    }

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

  async findAll(filter: SearchFornecedoreDto): Promise<Fornecedores[]> {
    const limit = Number(process.env.LIMIT_PAGINATION) || 0;

    const whereParam: any = { status: 'ACTIVE' };
    if (filter.cnpj) {
      whereParam.email = filter.cnpj?.replace(/\D/g, '');
    }

    if (filter.nome) {
      whereParam.nome = Raw((alias) => `${alias} ILIKE '%${filter.nome}%'`);
    }
    return this.repository.find({
      where: whereParam,
    });
  }

  async createNew(data: CreateFornecedoreDto): Promise<Fornecedores | null> {
    return this.repository.save({
      endereco_id: data.municipio_id,
      nome: data.nome,
      cnpj: data.cnpj?.replace(/\D/g, ''),
    });
  }

  async updateCustom(id: number, data: UpdateFornecedoreDto): Promise<any> {
    return this.repository.save({
      id: id,
      nome: data.nome,
      cnpj: data.cnpj?.replace(/\D/g, ''),
    });
  }

  async softDeleteCustom(id: number) {
    return this.repository.save({
      id: id,
      status: 'INACTIVE',
    });
  }
}
