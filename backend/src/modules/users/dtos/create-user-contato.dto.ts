import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class createUserContato {
  @ApiProperty({
    description: 'Codigo do país',
    example: '+55',
    type: 'string',
  })
  @IsNotEmpty({ message: 'O campo codigo é obrigatório.' })
  @IsString({ message: 'O codigo deve ser uma string' })
  codigo: string;

  @ApiProperty({
    description: 'DDD do contato',
    type: 'string',
  })
  @IsNotEmpty({ message: 'O campo ddd é obrigatório.' })
  @IsString({ message: 'O ddd deve ser uma string' })
  ddd: string;

  @ApiProperty({
    description: 'Número do contato',
    type: 'string',
  })
  @IsNotEmpty({ message: 'O campo número é obrigatório.' })
  numero: string;

  @IsOptional()
  user_id: number;
}

export class createUserContatoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @Type(() => createUserContato)
  contatos: createUserContato[];
}
