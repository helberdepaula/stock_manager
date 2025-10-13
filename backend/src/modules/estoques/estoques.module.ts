import { Module } from '@nestjs/common';
import { EstoquesService } from './estoques.service';
import { EstoquesController } from './estoques.controller';
import { EstoquesRepository } from './repositories/estoques.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estoques } from './entities/estoque.entity';
import { ProdutosRepository } from '../produtos/repositories/produtos.repository';
import { FornecedoresRepository } from '../fornecedores/repositories/fornecedores.repository';
import { Produtos } from '../produtos/entities/produto.entity';
import { Fornecedores } from '../fornecedores/entities/fornecedore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estoques, Produtos, Fornecedores])],
  controllers: [EstoquesController],
  providers: [
    EstoquesService,
    EstoquesRepository,
    ProdutosRepository,
    FornecedoresRepository,
  ],
})
export class EstoquesModule {}
