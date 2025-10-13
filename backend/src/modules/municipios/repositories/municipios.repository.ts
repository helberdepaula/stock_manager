import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Municipios } from '../entities/municipio.entity';
import { SearchMunicipio } from '../dto/search-municipio.dto';

@Injectable()
export class MunicipiosRepository extends Repository<Municipios> {
  constructor(
    @InjectRepository(Municipios)
    private readonly repository: Repository<Municipios>,
  ) {
    super(Municipios, repository.manager, repository.queryRunner);
  }
  

  async findAll(queryParams: SearchMunicipio) {
    return this.repository.find({
      select:{id:true,nome:true},
      where: {
        estado: { id: Number(queryParams.estado_id) },
      },
    });
  }

}
