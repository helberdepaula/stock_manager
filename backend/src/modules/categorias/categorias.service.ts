import { Injectable } from '@nestjs/common';
import { CategoriasRepository } from './repositories/categorias.repository';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriaSearchDto } from './dto/cagoriaSearch.dtos';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class CategoriasService {
  constructor(private readonly categoriasRepository: CategoriasRepository) {}

  async findJson(queryParams: CategoriaSearchDto) {
    const result = await this.categoriasRepository.findAll(queryParams);
    return result.map((item) => {
      return {
        id: item.id,
        nome: item.nome,
      };
    });
  }

  async findAll(queryParams: CategoriaSearchDto) {
    const limit = Number(process.env.LIMIT_PAGINATION) || 0;
    const [result, total] =
      await this.categoriasRepository.findAllPagination(queryParams);

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
  create(data: CreateCategoriaDto) {
    return this.categoriasRepository.save(data);
  }

  @Transactional()
  update(id: number, data: UpdateCategoriaDto) {
    return this.categoriasRepository.save(data);
  }

  @Transactional()
  delete(id: number) {
    // return this.categoriasRepository.update({});
  }
}
