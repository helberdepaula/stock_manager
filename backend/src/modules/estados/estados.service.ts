import { Injectable } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { EstadosRepository } from './repositories/estados.repository';

@Injectable()
export class EstadosService {
  
  constructor(private readonly estadosRepository: EstadosRepository) {}
  findAll() {
    return this.estadosRepository.findAll()
  }
}
