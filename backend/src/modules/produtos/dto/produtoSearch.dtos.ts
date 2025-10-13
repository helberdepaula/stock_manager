import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ProdutoSearchDto {
  @ApiProperty({
    description: 'Nome do usuario',
    example: 'Leite de soja desnatado',
    required: false,
  })
  @IsString({ message: 'O nome do usuário dever ser uma string' })
  @IsOptional()
  nome?: string;

  @ApiProperty({
    description: 'Nome do usuario',
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
