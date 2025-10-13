import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enderecos } from '../entities/endereco.entity';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';
import { UpdateEnderecoDto } from '../dto/update-endereco.dto';

@Injectable()
export class EnderecosRepository extends Repository<Enderecos> {
  constructor(
    @InjectRepository(Enderecos)
    private readonly repository: Repository<Enderecos>,
  ) {
    super(Enderecos, repository.manager, repository.queryRunner);
  }

  async createCustom(data: CreateEnderecoDto): Promise<Enderecos | null> {
    return this.repository.save({
      logradouro: data.logradouro,
      cep: data.cep.replace(/\D/g, ''),
      numero: data.numero,
      complemento: data.complemento,
      bairro: data.bairro,
      municipio_id: data.municipio_id,
    });
  }

  async updateCustom(id: number, data: UpdateEnderecoDto) {
    return this.manager
      .createQueryBuilder()
      .where('id=:id', { id })
      .update(data);
  }
}
