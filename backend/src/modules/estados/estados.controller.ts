import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EstadosService } from './estados.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { getListJsonEstados } from './swagger/estados.swagger';

@ApiTags('Estados')
@ApiBearerAuth('JWT-auth')
@Controller('estados')
@UseGuards(JwtAuthGuard)
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) {}

  @Get()
  @ApiOperation({ summary: 'Obtem uma lista de estados brasileiros' })
  @ApiResponse({
    status: 200,
    ...getListJsonEstados,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
  })
  findAll() {
    return this.estadosService.findAll();
  }
}
