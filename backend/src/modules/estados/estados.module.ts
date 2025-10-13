import { Module } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { EstadosController } from './estados.controller';
import { EstadosRepository } from './repositories/estados.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estados } from './entities/estado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estados])],
  controllers: [EstadosController],
  providers: [EstadosService, EstadosRepository],
  exports: [EstadosRepository],
})
export class EstadosModule {}
