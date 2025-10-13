import { ApiResponseOptions } from '@nestjs/swagger';

export const getlistUserResponse: ApiResponseOptions = {
  description: 'lista de usuario retornada com sucesso',
  content: {
    'application/json': {
      example: {
        data: [
          {
            id: 1,
            nome: 'admin',
            email: 'admin@mail.com',
            pwd: 'hash',
            recoveryCode: null,
            perfil: 'ADMIN',
            createdAt: '2025-10-07T18:56:05.411Z',
            updatedAt: '2025-10-07T18:56:05.411Z',
          },
        ],
        meta: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 20,
        },
      },
    },
  },
};

const DetailObjet = {
  id: 1,
  nome: 'admin',
  email: 'admin@mail.com',
  perfil: 'ADMIN',
  createdAt: '2025-10-07T18:56:05.411Z',
  updatedAt: '2025-10-07T18:56:05.411Z',
  contatoUsers: [],
  endereco: null,
};

export const getUserDetail: ApiResponseOptions = {
  description: 'Registro de um usuário',
  content: {
    'application/json': {
      example: DetailObjet,
    },
  },
};

export const createrUser: ApiResponseOptions = {
  description: 'Usuário criado com sucesso',
  content: {
    'application/json': {
      example: {
        message: 'Usuário criado com sucesso',
        ...DetailObjet,
      },
    },
  },
};

export const updateUser: ApiResponseOptions = {
  description: 'Usuário atulizado com sucesso',
  content: {
    'application/json': {
      example: {
        message: 'Usuário atualizado com sucesso',
        ...DetailObjet,
      },
    },
  },
};

export const deletesUser: ApiResponseOptions = {
  description: 'Usuário deletado com sucesso',
};

export const createrContatoUser: ApiResponseOptions = {
  description: 'Contato do usuário foi criado com sucesso',
  content: {
    'application/json': {
      example: {
        message: 'Contato do usuário foi criado com sucesso',
        ...{
          data: [
            {
              id: 8,
              codigo: '+55',
              ddd: '62',
              numero: '982303656',
            },
            {
              id: 9,
              codigo: '+55',
              ddd: '62',
              numero: '982303656',
            },
            {
              id: 10,
              codigo: '+55',
              ddd: '62',
              numero: '982303656',
            },
          ],
        },
      },
    },
  },
};
