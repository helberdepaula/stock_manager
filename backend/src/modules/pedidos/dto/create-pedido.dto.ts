import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePedidoDto {
  @ApiProperty({
    description: 'O valor total da venda',
    type: 'string',
  })
  @IsNotEmpty({ message: 'O campo valor_total é obrigatório.' })
  valor_total: string;

  @ApiProperty({
    description: 'Data  venda',
    type: 'string',
  })
  @IsNotEmpty({ message: 'A data da venda é obrigatório.' })
  data_venda: string;

  user_id: number;
}
