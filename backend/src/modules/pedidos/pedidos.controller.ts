import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidoSearchDto } from './dto/pedido.search.dto';
import {
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { createPermissionsGuard } from '../auth/permissions.guard';
import { getlistPedidoResponse } from './swagger/pedidos.swagger';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Get()
  @ApiOperation({ summary: 'Obter uma lista de pedidos com paginação' })
  @ApiResponse({
    status: 200,
    ...getlistPedidoResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('READ'))
  findAll(@Query() queryPrams: PedidoSearchDto) {
    return this.pedidosService.findAll(queryPrams);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Obtem registro de um usuário' })
  @ApiResponse({
    status: 200,
    ...{},
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado ou não existe na base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('READ'))
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }

  @Post()
  @ApiOperation({
    summary: 'Cria um novo usuário no sistema com permissão de acesso',
  })
  @ApiResponse({
    status: 200,
    ...{},
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado ou foi removido da base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('CREATE'))
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Atualiza os dados de um usuário já existente' })
  @ApiResponse({
    status: 200,
    ...{},
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado ou não existe na base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('UDPATE'))
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(+id, updatePedidoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar  um pedido existente existente' })
  @ApiOkResponse({ description: 'Pedido cancelado com sucesso' })
  @ApiConflictResponse({ description: 'O pedido já foi cancelado' })
  @ApiNotFoundResponse({
    description: 'Pedido não encontrado',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('DELETE'))
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }
}
