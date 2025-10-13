import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProdutoDto {
  @ApiProperty({
    description: 'Código do produto',
    required: true,
  })
  @IsNotEmpty({ message: 'O campo código é obrigatório.' })
  @IsString({ message: 'O código deve ser uma string' })
  codigo: string;

  @ApiProperty({
    description: 'Nome do produto',
    required: true,
  })
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string' })
  nome: string;

  @ApiProperty({
    description: 'Categoria que o produto pertence',
    required: true,
  })
  categoria_id: number;

  @ApiProperty({
    description: 'Unidade de médidoa de venda do produto ',
    required: true,
  })
  unidade_id: number;

  @ApiProperty({
    description: 'Marca a qual o produto pertence ',
    required: true,
  })
  marca_id: number;
  user_id: number;
}
