import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Renovar token JWT usando refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ...',
  })
  @IsString({ message: 'O token refresh é obrigatório' })
  refreshToken: string;
}
