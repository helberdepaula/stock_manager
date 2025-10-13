import { ApiResponseOptions } from '@nestjs/swagger';

export const authResponse: ApiResponseOptions = {
  description:
    'Retorna os token de acesso e de refresh do usuário valido por 1 hora',
  content: {
    'application/json': {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik...',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX....',
      },
    },
  },
};

export const authGetProfile: ApiResponseOptions = {
  description: 'Retorna dados do perfil do usuário logado no sistema',
  content: {
    'application/json': {
      example: {
        id: 1,
        nome: 'admin',
        email: 'admin@mail.com',
        perfil: 'ADMIN',
        createdAt: '2025-10-07T18:56:05.411Z',
        updatedAt: '2025-10-07T18:56:05.411Z',
        contatoUsers: [],
        endereco: null,
      },
    },
  },
};
