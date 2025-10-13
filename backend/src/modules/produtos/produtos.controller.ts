import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { createPermissionsGuard } from '../auth/permissions.guard';
import { createrProduto } from './swagger/produtos.swagger';
import { ProdutoSearchDto } from './dto/produtoSearch.dtos';

@ApiTags('Produtos')
@Controller('produtos')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  findAll(@Query() queryParams: ProdutoSearchDto) {
    return this.produtosService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(+id);
  }

  @Post()
  @ApiOperation({
    summary: 'Cria um novo Produto no sistema',
  })
  @ApiResponse({
    status: 200,
    ...createrProduto,
  })
  @ApiNotFoundResponse({
    description: 'Produto não encontrado ou foi removido da base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('CREATE'))
  create(@Body() createProdutoDto: CreateProdutoDto, @Request() req) {
    createProdutoDto.user_id = req.user.id;
    return this.produtosService.create(createProdutoDto);
  }

  @Patch(':id')
  @Post()
  @ApiOperation({
    summary: 'Atualizar um Produto existente',
  })
  @ApiResponse({
    status: 200,
    ...createrProduto,
  })
  @ApiNotFoundResponse({
    description: 'Produto não encontrado ou foi removido da base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('UDPATE'))
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um produto existente' })
  @ApiOkResponse({ description: 'Produto removido com sucesso' })
  @ApiNotFoundResponse({
    description: 'Produto não encontrado ou não existe na base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiForbiddenResponse({
    description: 'Permissão insuficiente',
  })
  @UseGuards(createPermissionsGuard('DELETE'))
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }
}
