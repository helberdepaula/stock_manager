import { Injectable } from '@nestjs/common';;
import { UnidadesRepository } from './repositories/unidades.repository';

@Injectable()
export class UnidadesService {

  constructor(private readonly unidadesRepository:UnidadesRepository){}


  findAll() {
    return this.unidadesRepository.findAll()
  }
}
