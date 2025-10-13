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
import { MunicipiosService } from './municipios.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { getListJsonMunicipios } from './swagger/municipios.swagger';
import { SearchMunicipio } from './dto/search-municipio.dto';

@ApiTags('Municípios')
@ApiBearerAuth('JWT-auth')
@Controller('municipios')
@UseGuards(JwtAuthGuard)
export class MunicipiosController {
  constructor(private readonly municipiosService: MunicipiosService) {}

  @Get(':estado_id')
  @ApiOperation({ summary: 'Obtem uma lista de unidades' })
  @ApiResponse({
    status: 200,
    ...getListJsonMunicipios,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
  })
  findAll(
    @Param('estado_id') estado_id: string,
    @Query() data: SearchMunicipio,
  ) {
    return this.municipiosService.findAll({ ...data, ...{ estado_id } });
  }
}
