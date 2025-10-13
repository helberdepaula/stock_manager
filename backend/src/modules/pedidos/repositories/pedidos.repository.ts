import { Raw, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedidos } from '../entities/pedido.entity';
import { PedidoSearchDto } from '../dto/pedido.search.dto';

@Injectable()
export class PedidosRepository extends Repository<Pedidos> {
  constructor(
    @InjectRepository(Pedidos)
    private readonly repository: Repository<Pedidos>,
  ) {
    super(Pedidos, repository.manager, repository.queryRunner);
  }

  async findByPK(id: number): Promise<Pedidos | null> {
    return this.repository.findOne({
      relations: ['endereco'],
      where: { id,  },
    });
  }

  async findAllPagination(
    filter: PedidoSearchDto,
  ): Promise<[Pedidos[], number]> {
    const limit = Number(process.env.LIMIT_PAGINATION) || 0;
    const whereParam: any = { status: 'ACTIVE' };


    const offset =
      (Number(filter?.page) - 1 || 1 - 1) * Number(filter.limit || limit);
    return await this.repository.findAndCount({
      where: whereParam,
      take: filter.limit || limit,
      skip: offset ?? 0,
    });
  }
}
