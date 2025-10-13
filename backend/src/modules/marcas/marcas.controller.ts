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
} from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { getListJsonMarcas, getListMarcas } from './swagger/marcas.swagger';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { MarcasSearchDto } from './dto/marcasSearch.dtos';

@ApiTags('Marcas')
@ApiBearerAuth('JWT-auth')
@Controller('marcas')
@UseGuards(JwtAuthGuard)
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) {}

  @Get('list-json')
  @ApiOperation({ summary: 'Obtem uma lista de marcas' })
  @ApiResponse({
    status: 200,
    ...getListMarcas,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
  })
  listJSON(@Query() data: MarcasSearchDto) {
    return this.marcasService.findList(data);
  }

  @Get()
  @ApiOperation({ summary: 'Obtem uma lista de marcas com paginação' })
  @ApiResponse({
    status: 200,
    ...getListMarcas,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
  })
  findAll(@Query() data: MarcasSearchDto) {
    return this.marcasService.findAll(data);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastro uma nova marcadas' })
  @ApiResponse({
    status: 200,
    ...getListJsonMarcas,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
  })
  create(@Body() data: CreateMarcaDto) {
    return this.marcasService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma marcadas existente' })
  @ApiResponse({
    status: 200,
    ...getListJsonMarcas,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
  })
  update(@Param('id') id: number, @Body() data: UpdateMarcaDto) {
    return this.marcasService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma marcadas existente, softdelete' })
  @ApiResponse({
    status: 200,
    ...getListJsonMarcas,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
  })
  delete(@Param('id') id: number) {
    return this.marcasService.delete(id);
  }
}
