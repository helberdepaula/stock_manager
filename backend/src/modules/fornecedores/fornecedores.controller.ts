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
import { FornecedoresService } from './fornecedores.service';
import { CreateFornecedoreDto } from './dto/create-fornecedore.dto';
import { UpdateFornecedoreDto } from './dto/update-fornecedore.dto';
import { SearchFornecedoreDto } from './dto/search-fornecedore.dto';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  createrCotnatoFornecedores,
  createrFornecedores,
  getlistFornecedoresResponse,
  getUserDetail,
} from './swagger/fornecedores.swagger';
import { createPermissionsGuard } from '../auth/permissions.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { createFornecedorContatoDto } from './dto/create-fornecedor-contato.dto';

@ApiTags('Fornecedores')
@Controller('fornecedores')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class FornecedoresController {
  constructor(private readonly fornecedoresService: FornecedoresService) {}

  @Get()
  @ApiOperation({ summary: 'Obter uma lista de fornecedores com paginação' })
  @ApiResponse({
    status: 200,
    ...getlistFornecedoresResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('READ'))
  findAll(@Query() data: SearchFornecedoreDto) {
    return this.fornecedoresService.findAll(data);
  }

  @ApiOperation({ summary: 'Obtem registro de um fornecedor' })
  @ApiResponse({
    status: 200,
    ...getUserDetail,
  })
  @ApiNotFoundResponse({
    description: 'Fornecedor não encontrado ou não existe na base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('READ'))
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fornecedoresService.findOne(id);
  }

  @Post()
  @UseGuards(createPermissionsGuard('CREATE'))
  @ApiOperation({
    summary: 'Cria um novo fornecedore no sistema com permissão de acesso',
  })
  @ApiResponse({
    status: 200,
    ...createrFornecedores,
  })
  @ApiNotFoundResponse({
    description: 'Forenecedore não encontrado ou foi removido da base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @UseGuards(createPermissionsGuard('CREATE'))
  create(@Body() createFornecedoreDto: CreateFornecedoreDto) {
    return this.fornecedoresService.create(createFornecedoreDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza os dados de um Forenecedore já existente',
  })
  @ApiResponse({
    status: 200,
    ...createrFornecedores,
  })
  @ApiNotFoundResponse({
    description: 'Forenecedore não encontrado ou não existe na base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('UDATE'))
  update(
    @Param('id') id: string,
    @Body() updateFornecedoreDto: UpdateFornecedoreDto,
  ) {
    return this.fornecedoresService.update(+id, updateFornecedoreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um usuario existente existente' })
  @ApiOkResponse({ description: 'Fornecedore removido com sucesso' })
  @ApiNotFoundResponse({
    description: 'Fornecedore não encontrado ou não existe na base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('DELETE'))
  remove(@Param('id') id: string) {
    return this.fornecedoresService.remove(+id);
  }

  @Get('/contato/:id')
  @ApiOperation({
    summary: 'Obtem uma lista de contatos do fornecedor',
  })
  @ApiResponse({
    status: 200,
    ...createrCotnatoFornecedores,
  })
  @ApiNotFoundResponse({
    description: 'Fornecedor não encontrado ou foi removido da base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('READ'))
  async getcontatoForencedor(
    @Param('id') id: string,
  ) {
    return this.fornecedoresService.getContatoFornecedor(+id);
  }

  @Post('/contato/:id')
  @ApiOperation({
    summary: 'Cria um novo contato para o fornecedor',
  })
  @ApiResponse({
    status: 200,
    ...createrCotnatoFornecedores,
  })
  @ApiNotFoundResponse({
    description: 'Fornecedor não encontrado ou foi removido da base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('CREATE'))
  async createUseContato(
    @Param('id') id: string,
    @Body() data: createFornecedorContatoDto,
  ) {
    return this.fornecedoresService.createContato(+id, data);
  }
}
