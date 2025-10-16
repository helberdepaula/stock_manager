import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFornecedoreDto } from './dto/create-fornecedore.dto';
import { UpdateFornecedoreDto } from './dto/update-fornecedore.dto';
import { SearchFornecedoreDto } from './dto/search-fornecedore.dto';
import { FornecedoresRepository } from './repositories/fornecedores.repository';
import { Transactional } from 'typeorm-transactional';
import { EnderecosRepository } from '../enderecos/repositories/enderecos.repository';
import { Not } from 'typeorm';
import { MunicipiosRepository } from '../municipios/repositories/municipios.repository';
import { createFornecedorContatoDto } from './dto/create-fornecedor-contato.dto';
import { ContatoFornecedorRepository } from './repositories/contato.fornecedor.repository';
import { ContatosRepository } from '../contatos/repositories/contatos.repository';

@Injectable()
export class FornecedoresService {
  constructor(
    private readonly fornecedoreRespository: FornecedoresRepository,
    private readonly enderecoReponsitory: EnderecosRepository,
    private readonly municipioRepository: MunicipiosRepository,
    private readonly contatoFornecedorRepository: ContatoFornecedorRepository,
    private readonly contatoRepository: ContatosRepository,
  ) {}

  async findAll(queryParams: SearchFornecedoreDto) {
    const limit = Number(process.env.LIMIT_PAGINATION) || 0;
    const [result, total] =
      await this.fornecedoreRespository.findAllPagination(queryParams);

    return {
      data: result,
      meta: {
        page: 1,
        limit: Number(queryParams.limit) || limit,
        total: total,
      },
    };
  }

  async findOne(id: number) {
    const result = await this.fornecedoreRespository.findByPK(id);
    if (!result) {
      throw new NotFoundException([
        'O fornecedor não existe ou foi removido da base de dados',
      ]);
    }
    return result;
  }

  @Transactional()
  async create(data: CreateFornecedoreDto) {
    const [existf, existMuni] = await Promise.all([
      this.fornecedoreRespository.findByCNPJ(data.cnpj),
      this.municipioRepository.count({ where: { id: data.municipio_id } }),
    ]);

    if (existf) {
      throw new ConflictException([
        'Já existe um cadastro para o CNPJ informado',
      ]);
    }

    if (!existMuni) {
      throw new NotFoundException([
        'O municipio informado não existe no base de dados',
      ]);
    }

    const endereco = await this.enderecoReponsitory.createCustom(data);
    if (!endereco) {
      throw new ConflictException(['Falha no cadastro de endereço do usuário']);
    }

    data.municipio_id = endereco.id;
    const result = await this.fornecedoreRespository.createNew(data);
    return { message: 'Fornecedor cadastro com sucesso', data: result };
  }

  async update(id: number, data: UpdateFornecedoreDto) {
    const [fornecedor, existUser, existMuni] = await Promise.all([
      this.fornecedoreRespository.findByPK(id),
      this.fornecedoreRespository.count({
        where: {
          id: Not(id),
          cnpj: data.cnpj?.replace(/\D/g, ''),
        },
      }),
      this.municipioRepository.count({ where: { id: data.municipio_id } }),
    ]);

    if (!fornecedor) {
      throw new NotFoundException([
        'O fornecedor não existe ou foi removido da base de dados',
      ]);
    }

    if (existUser) {
      throw new ConflictException([
        'O CNPJ já existe um cadatro para esse cnpj no sistema',
      ]);
    }

    if (!existMuni) {
      throw new NotFoundException([
        'O municipio informado não existe no base de dados',
      ]);
    }
    await this.enderecoReponsitory.updateCustom(fornecedor.endereco.id, data);

    await this.fornecedoreRespository.updateCustom(id, {
      cnpj: data.cnpj?.replace(/\D/g, ''),
      nome: data.nome,
    });

    return { message: 'Fornecedores ataulizado com sucesso' };
  }

  async remove(id: number) {
    const existUser = await this.fornecedoreRespository.count({
      where: { id, status: 'ACTIVE' },
    });

    if (existUser <= 0) {
      throw new NotFoundException([
        'O fornecedor não existe ou foi removido da base de dados',
      ]);
    }
    await this.fornecedoreRespository.softDeleteCustom(id);
    return { message: 'Usuário removido com sucesso' };
  }

  async getContatoFornecedor(id: number) {
    const fornecedor = await this.fornecedoreRespository.findByPK(id);

    if (!fornecedor) {
      throw new ConflictException([
        'O fornecedor informado não existe ou foi removido do sistema.',
      ]);
    }
    const result = await this.contatoFornecedorRepository.findAll(+id);
    return {
      data: result.map((item) => {
        return item.contato;
      }),
    };
  }

  @Transactional()
  async createContato(id: number, data: createFornecedorContatoDto) {
    const fornecedor = await this.fornecedoreRespository.findByPK(id);

    if (!fornecedor) {
      throw new ConflictException([
        'O fornecedor informado não existe ou foi removido do sistema.',
      ]);
    }

    const result = await Promise.all(
      data.contatos.map(async (data) => {
        data.numero = data.numero.replace(/\D/g, '');
        data.ddd = data.ddd.replace(/\D/g, '');
        data.user_id = id;
        const contato = await this.contatoRepository.save(data);
        const restul = await this.contatoFornecedorRepository.save({
          fornecedor: fornecedor,
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
