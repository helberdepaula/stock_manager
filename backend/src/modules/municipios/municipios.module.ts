import { Module } from '@nestjs/common';
import { MunicipiosService } from './municipios.service';
import { MunicipiosController } from './municipios.controller';
import { MunicipiosRepository } from './repositories/municipios.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipios } from './entities/municipio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Municipios])],
  controllers: [MunicipiosController],
  providers: [MunicipiosService, MunicipiosRepository],
  exports: [MunicipiosRepository],
})
export class MunicipiosModule {}
