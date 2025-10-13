import { Injectable } from '@nestjs/common';
import { MunicipiosRepository } from './repositories/municipios.repository';
import { SearchMunicipio } from './dto/search-municipio.dto';

@Injectable()
export class MunicipiosService {
  constructor(private readonly municipiosRepository: MunicipiosRepository) {}

  findAll(data: SearchMunicipio) {
    return this.municipiosRepository.findAll(data);
  }
}
