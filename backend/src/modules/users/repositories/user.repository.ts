import { Raw, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSearchDto } from '../dtos/userSearch.dtos';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserRepository extends Repository<Users> {
  constructor(
    @InjectRepository(Users)
    private readonly repository: Repository<Users>,
  ) {
    super(Users, repository.manager, repository.queryRunner);
  }

  async findByPK(id: number): Promise<Users | null> {
    return this.repository.findOne({
      relations: ['endereco'],
      where: { id, status: 'ACTIVE' },
    });
  }

  async findAllPagination(filter: UserSearchDto): Promise<[Users[], number]> {
    const limit = Number(process.env.LIMIT_PAGINATION) || 0;

    const whereParam: any = { status: 'ACTIVE' };
    if (filter.email) {
      whereParam.email = Raw((alias) => `${alias} ILIKE '%${filter.email}%'`);
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

  async findCount(filter: UserSearchDto): Promise<number> {
    const whereParam: any = { status: 'ACTIVE' };
    if (filter.email) {
      whereParam.email = Raw((alias) => `${alias} ILIKE '%${filter.email}%'`);
    }

    if (filter.nome) {
      whereParam.nome = Raw((alias) => `${alias} ILIKE '%${filter.nome}%'`);
    }
    return this.repository.count({ where: whereParam });
  }

  async findAll(filter: UserSearchDto): Promise<Users[]> {
    const limit = Number(process.env.LIMIT_PAGINATION) || 0;

    const whereParam: any = { status: 'ACTIVE' };
    if (filter.email) {
      whereParam.email = Raw((alias) => `${alias} ILIKE '%${filter.email}%'`);
    }

    if (filter.nome) {
      whereParam.nome = Raw((alias) => `${alias} ILIKE '%${filter.nome}%'`);
    }
    return this.repository.find({
      where: whereParam,
    });
  }

  async findByName(name: string): Promise<Users | null> {
    return this.findOne({ where: { nome: name } });
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.findOne({ where: { email } });
  }

  async createNew(data: CreateUserDto): Promise<Users | null> {
    return this.repository.save({
      nome: data.nome,
      email: data.email,
      pwd: data.pwd,
      perfil: data.perfil,
      endereco_id: data.endereco_id,
    });
  }

  async udapteCustom(id: number, data: UpdateUserDto): Promise<Users | null> {
    return this.repository.save({
      id: id,
      nome: data.nome,
      email: data.email,
    });
  }

  async softDeleteCustom(id: number) {
    return this.repository.save({
      id: id,
      status: 'INACTIVE',
    });
  }
}
