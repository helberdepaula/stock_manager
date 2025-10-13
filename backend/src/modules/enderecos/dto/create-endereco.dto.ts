import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEnderecoDto {
  //dados do enedereço do usuario
  @ApiProperty({
    description: 'Código da cidade',
    example: '52',
  })
  @IsNotEmpty({ message: 'A cidade é obrigatório.' })
  @IsNumber({}, { message: 'O paramentro municipio_id dever ser um número' })
  municipio_id: number;

  @ApiProperty({
    description: 'Logradouro',
    example: '52',
  })
  @IsNotEmpty({ message: 'O campo logradouro é obrigatório.' })
  @IsString({ message: 'O logradouro deve ser uma string' })
  logradouro: string;

  @ApiProperty({
    description: 'Codigo postal (CEP)',
    example: '##.####-###',
  })
  @IsNotEmpty({ message: 'O campo CEP é obrigatório.' })
  @IsString({ message: 'O CEP deve ser uma string' })
  cep: string;

  @ApiProperty({
    description: 'Número',
    example: '##.####-###',
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
}
