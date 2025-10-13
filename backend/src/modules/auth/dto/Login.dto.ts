import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: 'Endereço de email do usuário',
    example: 'email@exemple.com',
  })
  @IsEmail({}, { message: 'Email deve ser válido' })
  @IsString({ message: 'Email deve ser uma string' })
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'senha alfanumerica' })
  @IsString({ message: 'Senha deve ser uma string' })
  password: string;
}