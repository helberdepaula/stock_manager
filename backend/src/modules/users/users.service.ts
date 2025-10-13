import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserSearchDto } from './dtos/userSearch.dtos';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import bcrypt from 'bcrypt';
import { Transactional } from 'typeorm-transactional';
import { EnderecosRepository } from '../enderecos/repositories/enderecos.repository';
import { MunicipiosRepository } from '../municipios/repositories/municipios.repository';
import { Not } from 'typeorm';
import { createUserContatoDto } from './dtos/create-user-contato.dto';
import { ContatoUserRepository } from './repositories/contato.user.repository';
import { ContatosRepository } from '../contatos/repositories/contatos.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly municipioRepository: MunicipiosRepository,
    private readonly enderecoRepository: EnderecosRepository,
    private readonly userRepository: UserRepository,
    private readonly contatoUserRepository: ContatoUserRepository,
    private readonly conatoRepository: ContatosRepository,
  ) {}

  async findById(id: string) {
    const result = await this.userRepository.findByPK(Number(id));
    if (!result) {
      throw new NotFoundException([
        'Usuário não encontrado ou foi removido da base de dados',
      ]);
    }

    return {
      id: result.id,
      nome: result.nome,
      email: result.email,
      perfil: result.perfil,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      contatoUsers: result.contatoUsers,
      endereco: result.endereco,
    };
  }

  async findAll(queryParams: UserSearchDto) {
    const limit = Number(process.env.LIMIT_PAGINATION) || 0;
    const [result, total] =
      await this.userRepository.findAllPagination(queryParams);

    return {
      data: result,
      meta: {
        page: 1,
        limit: Number(queryParams.limit) || limit,
        total: total,
      },
    };
  }

  @Transactional()
  async create(data: CreateUserDto) {
    const [existUser, existMuni] = await Promise.all([
      this.userRepository.findByEmail(data.email),
      this.municipioRepository.count({ where: { id: data.municipio_id } }),
    ]);

    if (existUser) {
      throw new ConflictException([
        'E-mail já está sendo usado no por um outro usuário no sistema',
      ]);
    }

    if (!existMuni) {
      throw new NotFoundException([
        'O municipio informado não existe no base de dados',
      ]);
    }

    const endereco = await this.enderecoRepository.createCustom(data);
    if (!endereco) {
      throw new ConflictException(['Falha no cadastro de endereço do usuário']);
    }

    const salt = await bcrypt.genSalt(10);
    data.pwd = await bcrypt.hash(data.pwd, salt);
    const restul = await this.userRepository.createNew({
      ...data,
      ...{
        endereco_id: endereco.id,
      },
    });

    return { message: 'Usuário criado com sucesso', data: restul };
  }

  @Transactional()
  async update(id: number, data: UpdateUserDto) {
    const [user, existUserEmail, existMuni] = await Promise.all([
      this.userRepository.findByPK(id),
      this.userRepository.count({ where: { id: Not(id), email: data.email } }),
      this.municipioRepository.count({ where: { id: data.municipio_id } }),
    ]);

    if (!user) {
      throw new NotFoundException([
        'O usuário não existe ou foi removido da base de dados',
      ]);
    }

    if (existUserEmail) {
      throw new ConflictException([
        'E-mail já está sendo usado no por um outro usuário no sistema',
      ]);
    }

    if (!existMuni) {
      throw new NotFoundException([
        'O municipio informado não existe no base de dados',
      ]);
    }

    if (data.pwd) {
      const salt = await bcrypt.genSalt(10);
      data.pwd = await bcrypt.hash(data.pwd, salt);
    }

    const restul = await this.userRepository.udapteCustom(id, {
      nome: data.nome,
      email: data.email,
      pwd: data.pwd ?? undefined,
      perfil: data.perfil,
    });
    return { message: 'Usuário atualizado com sucesso' };
  }

  @Transactional()
  async softDelete(id: number) {
    const existUser = await this.userRepository.count({
      where: { id, status: 'ACTIVE' },
    });

    if (existUser <= 0) {
      throw new NotFoundException([
        'O usuário não existe ou foi removido da base de dados',
      ]);
    }
    await this.userRepository.softDeleteCustom(id);

    return { message: 'Usuário removido com sucesso' };
  }

  @Transactional()
  async createContato(id: number, data: createUserContatoDto) {
    const existUser = await this.userRepository.findByPK(id);

    if (!existUser) {
      throw new ConflictException([
        'O usuário informado não existe ou foi removido do sistema.',
      ]);
    }

    const result = await Promise.all(
      data.contatos.map(async (data) => {
        data.numero = data.numero.replace(/\D/g, '');
        data.ddd = data.ddd.replace(/\D/g, '');
        data.user_id = id;
        const contato = await this.conatoRepository.save(data);
        const restul = await this.contatoUserRepository.save({
          user: existUser,
          contato: contato,
        });
        return {
          id: restul.id,
          codigo: contato.codigo,
          ddd: contato.ddd,
          numero: contato.numero,
        };
      }),
    );

    return {
      message: 'Contato do usuário foi criado com sucesso',
      data: result,
    };
  }
}
