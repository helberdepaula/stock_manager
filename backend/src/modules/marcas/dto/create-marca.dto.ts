import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateMarcaDto {
  @ApiProperty({
    description: 'O nome da marcada',
    example: 'Yper',
    type: 'string',
  })
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string' })
  nome: string;
}
