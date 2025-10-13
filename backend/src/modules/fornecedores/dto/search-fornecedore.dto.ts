import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SearchFornecedoreDto {
  @ApiProperty({
    description: 'CPNJ do fornecedor',
    required: false,
  })
  @IsOptional()
  cnpj?: string;

  @ApiProperty({
    description: 'Nome do fornecedor',
    required: false,
  })
  @IsOptional()
  nome?: string;

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
