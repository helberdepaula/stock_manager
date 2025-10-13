import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEstoqueDto {
  @ApiProperty({
    description: 'Código do produto',
  })
  @IsNumber({}, { message: 'O codigo do produto é um inteiro' })
  @IsNotEmpty({ message: 'O código do produto é obrigatório.' })
  produto_id: number;

  @ApiProperty({
    description: 'Código do fornecedor',
  })
  @IsNumber({}, { message: 'O codigo do fornecedor é um inteiro' })
  @IsNotEmpty({ message: 'O código do fornecedor é obrigatório.' })
  fornecedor_id: number;

  @ApiProperty({
    description: 'Corredor onde está localizado o produto no estoque',
    type: 'string',
  })
  @IsNotEmpty({ message: 'O corredo é obrigatório.' })
  @IsString({ message: 'O corredo deve ser uma string' })
  corredor: string;

  @ApiProperty({
    description: 'Preteleira onde está localizado o produto no estoque',
    type: 'string',
  })
  @IsNotEmpty({ message: 'A prateleira é obrigatório.' })
  @IsString({ message: 'A prateleira deve ser uma string' })
  prateleira: string;

  @ApiProperty({
    description: 'A secao onde está localizado o produto no estoque',
    type: 'string',
  })
  @IsNotEmpty({ message: 'A secao é obrigatório.' })
  @IsString({ message: 'A secao deve ser uma string' })
  secao: string;

  @ApiProperty({
    description: 'Lote do produto',
    type: 'string',
  })
  @IsNotEmpty({ message: 'O lote é obrigatório.' })
  @IsString({ message: 'O lote deve ser uma string' })
  sku: string;

  @ApiProperty({
    description: 'A Quantidade do produto no estoque',
    type: 'string',
  })
  @IsNotEmpty({ message: 'A quantidade é obrigatório.' })
  @IsString({ message: 'A quantidade deve ser uma string' })
  quantidade: string;

  @ApiProperty({
    description: 'Preço de custo  do produto',
    type: 'string',
  })
  @IsNotEmpty({ message: 'O campo preço de custo é obrigatório.' })
  @IsString({ message: 'O campo preço de custo uma string' })
  preco_custo: string;

  @ApiProperty({
    description: 'Data do vencimento do produto',
    type: 'string',
  })
  @IsNotEmpty({ message: 'O campo data de vencimento é obrigatório.' })
  @IsString({ message: 'O campo data de vencimento  uma string' })
  data_vencimento: string;

  user_id: number;
}
