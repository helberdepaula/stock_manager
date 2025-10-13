import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';
import { EstoquesRepository } from './repositories/estoques.repository';
import { SearchEstoqueDto } from './dto/searchEstoque.dtos';
import { ProdutosRepository } from '../produtos/repositories/produtos.repository';
import { FornecedoresRepository } from '../fornecedores/repositories/fornecedores.repository';

@Injectable()
export class EstoquesService {
  constructor(
    private readonly estoqueRepository: EstoquesRepository,
    private readonly produtosRepository: ProdutosRepository,
    private readonly fornecedoresRepository: FornecedoresRepository,
  ) {}

  async findAll(queryParams: SearchEstoqueDto) {
    const limit = Number(process.env.LIMIT_PAGINATION) || 0;
    const [result, total] =
      await this.estoqueRepository.findAllPagination(queryParams);

    return {
      data: result,
      meta: {
        page: 1,
        limit: Number(queryParams.limit) || limit,
        total: total,
      },
    };
  }

  findOne(id: number) {
    return this.estoqueRepository.findByPK(id);
  }

  async create(createEstoqueDto: CreateEstoqueDto) {
    const [produto, forencedor] = await Promise.all([
      this.produtosRepository.findByPK(createEstoqueDto.produto_id),
      this.fornecedoresRepository.findByPK(createEstoqueDto.fornecedor_id),
    ]);

    if (!produto) {
      throw new NotFoundException(['O produto não existe ou foi removido']);
    }
    if (!forencedor) {
      throw new NotFoundException(['O fornecedor não existe ou foi removido']);
    }
    return this.estoqueRepository.save({
      createEstoqueDto,
      ...{
        produto,
        forencedor,
      },
    });
  }

}
