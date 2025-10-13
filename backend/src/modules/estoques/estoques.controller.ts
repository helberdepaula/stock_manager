import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { EstoquesService } from './estoques.service';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { SearchEstoqueDto } from './dto/searchEstoque.dtos';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { getListEstoque } from './swagger/estoque.swagger';
import { createPermissionsGuard } from '../auth/permissions.guard';

@ApiTags('Estoque')
@Controller('estoques')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class EstoquesController {
  constructor(private readonly estoquesService: EstoquesService) {}

  @Get()
  @ApiOperation({ summary: 'Obter uma lista com paginação' })
  @ApiResponse({
    status: 200,
    ...getListEstoque,
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('READ'))
  findAll(searchEstoque: SearchEstoqueDto) {
    return this.estoquesService.findAll(searchEstoque);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Obtem o registro de um estoque' })
  @ApiResponse({
    status: 200,
    ...{},
  })
  @ApiNotFoundResponse({
    description: 'Estoque não foi localizado ',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('READ'))
  findOne(@Param('id') id: string) {
    return this.estoquesService.findOne(+id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar uma entrada no estoque',
  })
  @ApiResponse({
    status: 200,
    ...{},
  })
  @ApiNotFoundResponse({
    description: 'Produto não existe ou foi removido ',
  })
  @ApiNotFoundResponse({
    description: 'Fornecedor não existe ou foi removido ',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('CREATE'))
  create(@Body() createEstoqueDto: CreateEstoqueDto) {
    return this.estoquesService.create(createEstoqueDto);
  }
}
