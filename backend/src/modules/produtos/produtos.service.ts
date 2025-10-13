import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoSearchDto } from './dto/produtoSearch.dtos';
import { ProdutosRepository } from './repositories/produtos.repository';
import { MarcasRepository } from '../marcas/repositories/marcas.repository';
import { UnidadesRepository } from '../unidades/repositories/unidades.repository';
import { CategoriasRepository } from '../categorias/repositories/categorias.repository';

@Injectable()
export class ProdutosService {
  constructor(
    private readonly produtosRepository: ProdutosRepository,
    private readonly marcaRepository: MarcasRepository,
    private readonly unidadeRepository: UnidadesRepository,
    private readonly categoriaRepository: CategoriasRepository,
  ) {}

  async findAll(queryParams: ProdutoSearchDto) {
    const limit = Number(process.env.LIMIT_PAGINATION) || 0;
    const [result, total] =
      await this.produtosRepository.findAllPagination(queryParams);

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
    const result = await this.produtosRepository.findByPK(Number(id));
    if (!result) {
      throw new NotFoundException([
        'Produto não encontrado ou foi removido da base de dados',
      ]);
    }

    return result;
  }

  async create(createProdutoDto: CreateProdutoDto) {
    const [marca, categoria, unidade] = await Promise.all([
      this.marcaRepository.findByPK(createProdutoDto.marca_id),
      this.categoriaRepository.findByPK(createProdutoDto.categoria_id),
      this.unidadeRepository.findByPK(createProdutoDto.unidade_id),
    ]);

    if (!marca) {
      throw new NotFoundException([
        'Marca informada não existe ou fui removida',
      ]);
    }

    if (!categoria) {
      throw new NotFoundException([
        'Categoria informada não existe ou fui removida',
      ]);
    }

    if (!unidade) {
      throw new NotFoundException([
        'Unidade informada não existe ou fui removida',
      ]);
    }

    const resust = await this.produtosRepository.save({
      ...createProdutoDto,
      ...{
        user: { id: createProdutoDto.user_id },
        marca,
        categoria,
        unidade,
      },
    });

    return {
      message: 'Produto criado com sucesso.',
      data: resust,
    };
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
