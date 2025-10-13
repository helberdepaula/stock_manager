import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchMunicipio {
  @ApiProperty({
    description: 'Código do estados',
    example: '11',
  })
  @IsOptional()
  estado_id?: string;
}
