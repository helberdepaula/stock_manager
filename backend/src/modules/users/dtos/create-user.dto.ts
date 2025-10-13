import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TypeRules } from '../entities/users.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome o do usuario do sistama',
    example: 'Gilberto Atrogildo Caduco',
    type: 'string',
  })
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string' })
  nome: string;

  @ApiProperty({
    description: 'Endereço de email do usuário',
    example: 'email@exemple.com',
    type: 'string',
  })
  @IsNotEmpty({ message: 'O campo email é obrigatório.' })
  @IsEmail({}, { message: 'Email deve ser válido' })
  @IsString({ message: 'Email deve ser uma string' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha alfanumerica',
    type: 'string',
  })
  @IsNotEmpty({ message: 'O campo senha é obrigatório.' })
  pwd: string;

  @ApiProperty({
    description: 'Perfil do usuário',
    enum: TypeRules,
  })
  @IsNotEmpty({ message: 'O campo perfil é obrigatório.' })
  @IsEnum(TypeRules, { message: 'O perfil é do tipo ADMIN ou VENDEDOR' })
  perfil: TypeRules.ADMIN | TypeRules.VENDEDOR;

  @IsOptional()
  endereco_id: number;

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
    example: 'Rua dos passarinhos',
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
}
