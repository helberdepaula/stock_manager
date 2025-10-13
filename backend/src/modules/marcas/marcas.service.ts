import { ConflictException, Injectable } from '@nestjs/common';
import { MarcasRepository } from './repositories/marcas.repository';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { MarcasSearchDto } from './dto/marcasSearch.dtos';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class MarcasService {
  constructor(private readonly marcasRepository: MarcasRepository) {}

  findList(data: MarcasSearchDto) {
    return this.marcasRepository.findAll(data);
  }

  async findAll(queryParams: MarcasSearchDto) {
    queryParams.limit = queryParams.limit || 10;
    const [result, total] =
      await this.marcasRepository.findAllPagination(queryParams);

    return {
      data: result,
      meta: {
        page: 1,
        limit: Number(queryParams.limit),
        total: total,
      },
    };
  }

  @Transactional()
  async create(data: CreateMarcaDto) {
    const exists = await this.marcasRepository.findByName(data.nome);
    if (exists) {
      throw new ConflictException([
        'Já existe uma marca com esse nome cadastrado no banco de dados',
      ]);
    }
    await this.marcasRepository.createNew(data);
    return { message: 'Marca criada com sucesso' };
  }

  @Transactional()
  async update(id: number, data: UpdateMarcaDto) {
    const [exists, marca] = await Promise.all([
      this.marcasRepository.findByNameISNOT(id, data.nome),
      this.marcasRepository.findByPK(id),
    ]);
    console;
    if (exists) {
      throw new ConflictException([
        'Já existe uma marca com esse nome cadastrado no banco de dados',
      ]);
    }

    if (!marca) {
      throw new ConflictException([
        'A marca não foi encontraa ou não existe em nossa base de dados',
      ]);
    }

    await this.marcasRepository.updateCustom(id, data);
    return { message: 'Marca atualizado com sucesso' };
  }

  async delete(id: number) {
    const marca = await this.marcasRepository.findByPK(id);
    if (!marca) {
      throw new ConflictException([
        'A marca não foi encontraa ou não existe em nossa base de dados',
      ]);
    }

    await this.marcasRepository.softDeleteCustom(Number(id));
    return { message: 'Marca removido com sucesso' };
  }
}
