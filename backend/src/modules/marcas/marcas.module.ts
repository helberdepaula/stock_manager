import { Module } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { MarcasController } from './marcas.controller';
import { MarcasRepository } from './repositories/marcas.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marcas } from './entities/marca.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Marcas])],
  controllers: [MarcasController],
  providers: [MarcasService, MarcasRepository],
  exports: [MarcasRepository],
})
export class MarcasModule {}
