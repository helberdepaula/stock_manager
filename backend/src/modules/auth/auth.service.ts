import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private refreshTokens: Map<string, string> = new Map();

  constructor(
    private jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async getProfile(id: number) {
    const user = await this.userRepository.findByPK(id);
    if (!user) {
      throw new NotFoundException([
        'Usuário não encontrado ou foi removido da base de dados',
      ]);
    }

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      perfil: user.perfil,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      //contatoUsers: user.contatoUsers,
      endereco: user.endereco,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(['Credenciais inválidas']);
    }

    const isPasswordValid = await bcrypt.compare(password, user.pwd);
    if (!isPasswordValid) {
      throw new UnauthorizedException(['Credenciais inválidas']);
    }

    const payload = {
      name: user.nome,
      email: user.email,
      role: user.perfil,
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET || '',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET || '',
    });
    this.refreshTokens.set(user.id.toString(), refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET || '',
      });
      const userId = payload.sub;
      const storedToken = this.refreshTokens.get(userId.toString());

      if (storedToken !== refreshToken) {
        throw new UnauthorizedException(['Refresh token inválido']);
      }

      const user = await this.userRepository.findByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException(['Usuário inválido ou inativo']);
      }

      const newPayload = {
        email: user.email,
        sub: user.id,
        role: user.perfil,
      };
      const newAccessToken = this.jwtService.sign(newPayload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET || '',
      });
      const newRefreshToken = this.jwtService.sign(newPayload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET || '',
      });

      this.refreshTokens.set(userId, newRefreshToken);
      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}
