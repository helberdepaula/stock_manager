import { Module } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { FornecedoresController } from './fornecedores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fornecedores } from './entities/fornecedore.entity';
import { FornecedoresRepository } from './repositories/fornecedores.repository';
import { Enderecos } from '../enderecos/entities/endereco.entity';
import { EnderecosRepository } from '../enderecos/repositories/enderecos.repository';
import { MunicipiosRepository } from '../municipios/repositories/municipios.repository';
import { Municipios } from '../municipios/entities/municipio.entity';
import { ContatoFornecedorRepository } from './repositories/contato.fornecedor.repository';
import { ContatosRepository } from '../contatos/repositories/contatos.repository';
import { ContatoFornecedor } from './entities/contato-fornecedor.entity';
import { Contatos } from '../contatos/entities/contato.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Fornecedores,
      Enderecos,
      Municipios,
      ContatoFornecedor,
      Contatos,
    ]),
  ],
  controllers: [FornecedoresController],
  providers: [
    FornecedoresService,
    FornecedoresRepository,
    EnderecosRepository,
    MunicipiosRepository,
    ContatoFornecedorRepository,
    ContatosRepository,
  ],
  exports: [FornecedoresRepository],
})
export class FornecedoresModule {}
