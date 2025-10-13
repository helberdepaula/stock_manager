import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserSearchDto {
  @ApiProperty({
    description: 'Nome do usuario',
    example: 'Alberto da silva sauro',
    required: false,
  })
  @IsString({ message: 'O nome do usuário dever ser uma string' })
  @IsOptional()
  nome?: string;

  @ApiProperty({
    description: 'Nome do usuario',
    example: 'user@email.com',
    required: false,
  })
  @IsString({ message: 'Email deve ser uma string' })
  @IsOptional()
  email?: string;

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
