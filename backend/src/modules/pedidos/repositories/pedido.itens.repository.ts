import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoItens } from '../entities/pedido.iten.entity';

@Injectable()
export class PedidoItensRepository extends Repository<PedidoItens> {
  constructor(
    @InjectRepository(PedidoItens)
    private readonly repository: Repository<PedidoItens>,
  ) {
    super(PedidoItens, repository.manager, repository.queryRunner);
  }
}
