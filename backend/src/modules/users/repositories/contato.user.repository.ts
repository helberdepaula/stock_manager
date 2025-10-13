import {  Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContatoUser } from '../entities/contato-user.entity';


@Injectable()
export class ContatoUserRepository extends Repository<ContatoUser> {
  constructor(
    @InjectRepository(ContatoUser)
    private readonly repository: Repository<ContatoUser>,
  ) {
    super(ContatoUser, repository.manager, repository.queryRunner);
  }

}
