import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  createrContatoUser,
  createrUser,
  getlistUserResponse,
  getUserDetail,
} from './swagger/user.swagger';
import { UserSearchDto } from './dtos/userSearch.dtos';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { createPermissionsGuard } from '../auth/permissions.guard';
import { createUserContatoDto } from './dtos/create-user-contato.dto';

@ApiTags('Usuários')
@Controller('users')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Obter uma lista de usuario com paginação' })
  @ApiResponse({
    status: 200,
    ...getlistUserResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('READ'))
  async getListUser(@Query() queryParams: UserSearchDto) {
    return this.usersService.findAll(queryParams);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Obtem registro de um usuário' })
  @ApiResponse({
    status: 200,
    ...getUserDetail,
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado ou não existe na base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('READ'))
  async getdetailUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Cria um novo usuário no sistema com permissão de acesso',
  })
  @ApiResponse({
    status: 200,
    ...createrUser,
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado ou foi removido da base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('CREATE'))
  async createUser(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Atualiza os dados de um usuário já existente' })
  @ApiResponse({
    status: 200,
    ...createrUser,
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado ou não existe na base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('UDPATE'))
  async udapteUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um usuario existente existente' })
  @ApiOkResponse({ description: 'Usuário removido com sucesso' })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado ou não existe na base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('DELETE'))
  async deleteUser(@Param('id') id: string) {
    return this.usersService.softDelete(Number(id));
  }

  @Post('/contato/:id')
  @ApiOperation({
    summary: 'Cria um novo contato para o usuário',
  })
  @ApiResponse({
    status: 200,
    ...createrContatoUser,
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado ou foi removido da base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('CREATE'))
  async createUseContato(
    @Param('id') id: string,
    @Body() data: createUserContatoDto,
  ) {
    return this.usersService.createContato(+id, data);
  }
}
