import { Module } from '@nestjs/common';
import { ContatosService } from './contatos.service';
import { ContatosController } from './contatos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contatos } from './entities/contato.entity';
import { ContatosRepository } from './repositories/contatos.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Contatos])],
  controllers: [ContatosController],
  providers: [ContatosService,ContatosRepository],
  exports:[ContatosRepository]
})
export class ContatosModule {}
