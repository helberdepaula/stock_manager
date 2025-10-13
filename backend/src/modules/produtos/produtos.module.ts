import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produtos } from './entities/produto.entity';
import { ProdutosRepository } from './repositories/produtos.repository';
import { MarcasRepository } from '../marcas/repositories/marcas.repository';
import { UnidadesRepository } from '../unidades/repositories/unidades.repository';
import { CategoriasRepository } from '../categorias/repositories/categorias.repository';
import { Marcas } from '../marcas/entities/marca.entity';
import { CategoriasEntity } from '../categorias/entities/categoria.entity';
import { Unidades } from '../unidades/entities/unidades.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produtos, Marcas, CategoriasEntity, Unidades]),
  ],
  controllers: [ProdutosController],
  providers: [
    ProdutosService,
    ProdutosRepository,
    MarcasRepository,
    UnidadesRepository,
    CategoriasRepository,
  ],
  exports: [ProdutosRepository],
})
export class ProdutosModule {}
