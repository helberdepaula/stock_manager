import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class MarcasSearchDto {
  @ApiProperty({
    description: 'Nome da marca',
    required: false,
  })
  @IsString({ message: 'O nome da marca dever ser uma string' })
  @IsOptional()
  nome?: string;

  @ApiProperty({
    description: 'Limite do retorno de registro',
    required: false,
  })
  @IsOptional()
  limit?: number;

  @ApiProperty({
    description: 'Paginação dos registro ',
    required: false,
  })
  @IsOptional()
  page?: number;
}
