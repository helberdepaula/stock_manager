import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiProperty,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/Login.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { authGetProfile, authResponse } from './swagger/auth.swagger';
@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Obter perfil do usuário autenticado' })
  @ApiResponse({
    status: 200,
    ...authGetProfile,
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado ou foi removido da base de dados',
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Fazer login e obter token JWT' })
  @ApiResponse({ status: 200, ...authResponse })
  @ApiUnauthorizedResponse({ description: 'Credenciais inválidas' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Patch('refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Renovar token JWT usando refresh token' })
  @ApiOkResponse({
    status: 200,
    ...authResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Refresh token inválido' })
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}
