import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PedidoSearchDto {
  @ApiProperty({
    description: 'Limite do retorno de registro',
    example: '10',
    required: false,
  })
  @IsOptional()
  limit?: number;

  @ApiProperty({
    description: 'Paginação dos registro ',
    example: '1',
    required: false,
  })
  @IsOptional()
  page?: number;
}
