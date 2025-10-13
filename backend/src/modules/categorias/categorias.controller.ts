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
import { CategoriasService } from './categorias.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  createCategoria,
  deletesCategoria,
  getListJsonCategorias,
  updateCategoria,
} from './swagger/categorias.swagger';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriaSearchDto } from './dto/cagoriaSearch.dtos';

@ApiTags('Categorias')
@ApiBearerAuth('JWT-auth')
@Controller('categorias')
@UseGuards(JwtAuthGuard)
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get('list-json')
  @ApiOperation({ summary: 'Obtem uma lista json' })
  @ApiResponse({
    status: 200,
    ...getListJsonCategorias,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
  })
  listJSON(@Query() queryParams: CategoriaSearchDto) {
    return this.categoriasService.findJson(queryParams);
  }

  @Get()
  @ApiOperation({ summary: 'Obtem uma lista de categorias' })
  @ApiResponse({
    status: 200,
    ...getListJsonCategorias,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
  })
  findAll(@Query() queryParams: CategoriaSearchDto) {
    return this.categoriasService.findAll(queryParams);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastro uma nova marcadas' })
  @ApiResponse({
    status: 200,
    ...createCategoria,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
  })
  create(@Body() data: CreateCategoriaDto) {
    return this.categoriasService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma marcadas existente' })
  @ApiResponse({
    status: 200,
    ...updateCategoria,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
  })
  update(@Param('id') id: number, @Body() data: UpdateCategoriaDto) {
    return this.categoriasService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma marcadas existente, softdelete' })
  @ApiResponse({
    status: 200,
    ...deletesCategoria,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
  })
  delete(@Param('id') id: number) {
    return this.categoriasService.delete(id);
  }
}
