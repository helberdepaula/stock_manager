import { Controller, Get } from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { getListJsonUnidades } from './swagger/unidades.swagger';

@ApiTags('Unidades')
@ApiBearerAuth('JWT-auth')
@Controller('unidades')
export class UnidadesController {
  constructor(private readonly unidadesService: UnidadesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtem uma lista de unidades' })
  @ApiResponse({
    status: 200,
    ...getListJsonUnidades,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
  })
  findAll() {
    return this.unidadesService.findAll();
  }
}
