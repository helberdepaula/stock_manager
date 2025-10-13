import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidoSearchDto } from './dto/pedido.search.dto';
import { PedidosRepository } from './repositories/pedidos.repository';

@Injectable()
export class PedidosService {
  constructor(private readonly pedidosRepository: PedidosRepository) {}

  async findAll(queryPrams: PedidoSearchDto) {
    const limit = Number(process.env.LIMIT_PAGINATION) || 0;
    const [result, total] =
      await this.pedidosRepository.findAllPagination(queryPrams);
    return {
      data: result,
      meta: {
        page: 1,
        limit: Number(queryPrams.limit) || limit,
        total: total,
      },
    };
  }

  create(createPedidoDto: CreatePedidoDto) {
    return 'This action adds a new pedido';
  }

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
