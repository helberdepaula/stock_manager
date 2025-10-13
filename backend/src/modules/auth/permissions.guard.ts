// src/modules/users/permissions.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    public readonly accessLevel: string,
  ) { }


  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user?.id) {
      throw new ForbiddenException('Usuário não autenticado');
    }

    const role = user.role;

    if (role === 'ADMIN') return true;

    if (role === 'VENDEDOR') {
      if (this.accessLevel !== 'READ') {
        throw new ForbiddenException(['Usuário com perfil de VENDEDOR só pode visualizar usuários']);
      }
      return true;
    }

    if (role === 'GUEST') {
      if (this.accessLevel === 'READ') {
        return true;
      }
      throw new ForbiddenException(['Usuário com perfil GUEST só pode visualizar clientes']);
    }

    throw new ForbiddenException(['Permissão insuficiente']);
  }
}

export function createPermissionsGuard(accessLevel: string) {
  @Injectable()
  class DynamicPermissionsGuard extends PermissionsGuard {
    constructor() {
      super( accessLevel);
    }
  }
  return DynamicPermissionsGuard;
}