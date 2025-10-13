import { ApiResponseOptions } from '@nestjs/swagger';

export const getListEstoque: ApiResponseOptions = {
  description: 'lista de produto no estoque retornada com sucesso',
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

};

export const getProdutoDetail: ApiResponseOptions = {
  description: 'Registro de um usuário',
  content: {
    'application/json': {
      example: DetailObjet,
    },
  },
};

export const createrProduto: ApiResponseOptions = {
  description: 'Entrada no estoque registrada com sucesso',
  content: {
    'application/json': {
      example: {
        message: 'Entrada no estoque registrada com sucesso',
      },
    },
  },
};
