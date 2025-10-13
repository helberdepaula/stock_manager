import { Module } from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { UnidadesController } from './unidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidades } from './entities/unidades.entity';
import { UnidadesRepository } from './repositories/unidades.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Unidades])],
  controllers: [UnidadesController],
  providers: [UnidadesService, UnidadesRepository],
  exports: [UnidadesRepository],
})
export class UnidadesModule {}
