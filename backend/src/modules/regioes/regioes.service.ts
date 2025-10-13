import { Injectable } from '@nestjs/common';
import { CreateRegioeDto } from './dto/create-regioe.dto';
import { UpdateRegioeDto } from './dto/update-regioe.dto';
import { RegioesRepository } from './repositories/regioes.repository';

@Injectable()
export class RegioesService {
  constructor(private readonly regioesRepository: RegioesRepository) {}

  findAll() {
    
    //usando o orm para contruir a consulta;
    //return this.regioesRepository.find({select:{id:true,nome:true}})

    //usando o orm apenas para rodar a query na consulta
    return this.regioesRepository.findQueryRaw();
  }
}
