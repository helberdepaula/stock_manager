import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { CategoriasRepository } from './repositories/categorias.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasEntity } from './entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriasEntity])],
  controllers: [CategoriasController],
  providers: [CategoriasService, CategoriasRepository],
  exports: [CategoriasRepository],
})
export class CategoriasModule {}
