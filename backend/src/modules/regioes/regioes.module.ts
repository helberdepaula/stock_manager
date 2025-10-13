import { Module } from '@nestjs/common';
import { RegioesService } from './regioes.service';
import { RegioesController } from './regioes.controller';
import { RegioesRepository } from './repositories/regioes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regioes } from './entities/regioes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Regioes])],
  controllers: [RegioesController],
  providers: [RegioesService, RegioesRepository],
  exports: [RegioesRepository],
})
export class RegioesModule {}
