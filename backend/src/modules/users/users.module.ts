import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { EnderecosRepository } from '../enderecos/repositories/enderecos.repository';
import { Enderecos } from '../enderecos/entities/endereco.entity';
import { Municipios } from '../municipios/entities/municipio.entity';
import { MunicipiosRepository } from '../municipios/repositories/municipios.repository';
import { ContatoUserRepository } from './repositories/contato.user.repository';
import { ContatoUser } from './entities/contato-user.entity';
import { ContatosRepository } from '../contatos/repositories/contatos.repository';
import { Contatos } from '../contatos/entities/contato.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Enderecos,
      Municipios,
      ContatoUser,
      Contatos,
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    EnderecosRepository,
    MunicipiosRepository,
    ContatoUserRepository,
    ContatosRepository,
  ],
  exports: [UsersService, TypeOrmModule, UserRepository],
})
export class UsersModule {}
