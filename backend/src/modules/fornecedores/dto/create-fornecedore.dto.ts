import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFornecedoreDto {
  @ApiProperty({
    description: 'CNPJ do fornecedor',
    example: '98.126.607/0001-17',
    required: true,
  })
  @IsNotEmpty({ message: 'O campo CNPJ é obrigatório.' })
  @IsString({ message: 'O CNPJ deve ser uma string' })
  cnpj: string;

  @ApiProperty({
    description: 'Nome do fornecedor',
    required: true,
    example: 'Pedro Castilho Dantra',
  })
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string' })
  nome: string;

  //dados do enedereço do usuario
  @ApiProperty({
    description: 'Código da cidade',
    example: '1100049',
  })
  @IsNotEmpty({ message: 'A cidade é obrigatório.' })
  @IsNumber({}, { message: 'O paramentro municipio_id dever ser um número' })
  municipio_id: number;

  @ApiProperty({
    description: 'Logradouro',
    example: 'rua era uma vez',
  })
  @IsNotEmpty({ message: 'O campo logradouro é obrigatório.' })
  @IsString({ message: 'O logradouro deve ser uma string' })
  logradouro: string;

  @ApiProperty({
    description: 'Codigo postal (CEP)',
    example: '74.000-000',
  })
  @IsNotEmpty({ message: 'O campo CEP é obrigatório.' })
  @IsString({ message: 'O CEP deve ser uma string' })
  cep: string;

  @ApiProperty({
    description: 'Número',
    example: 'S/N',
  })
  @IsOptional()
  @IsString({ message: 'O numero deve ser uma string' })
  numero: string;

  @ApiProperty({
    description: 'Complemento',
    example: 'Apartamento x y z ',
  })
  @IsOptional()
  @IsString({ message: 'O numero deve ser uma string' })
  complemento: string;

  @ApiProperty({
    description: 'Bairror',
    example: 'JD america ',
  })
  @IsNotEmpty({ message: 'O campo bairro é obrigatório.' })
  @IsString({ message: 'O bairro deve ser uma string' })
  bairro: string;

  @IsOptional()
  endereco_id: number;
}
