import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RegioesService } from './regioes.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { getListJsonRegioes } from './swagger/regioes.swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Regiões')
@ApiBearerAuth('JWT-auth')
@Controller('regioes')
@UseGuards(JwtAuthGuard)
export class RegioesController {
  constructor(private readonly regioesService: RegioesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtem uma lista de regiões' })
  @ApiResponse({
    status: 200,
    ...getListJsonRegioes,
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado',
  })
  findAll() {
    return this.regioesService.findAll();
  }
}
