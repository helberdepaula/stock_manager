import { ApiResponseOptions } from '@nestjs/swagger';

export const getListJsonMarcas: ApiResponseOptions = {
  description: 'lista de marcas retornada com sucesso',
  content: {
    'application/json': {
      example: {
        data: [
          {
            id: 1,
            nome: 'Cristal',
          },
          {
            id: 2,
            nome: 'Tio Jorger',
          },
        ],
      },
    },
  },
};

export const getListMarcas: ApiResponseOptions = {
  description: 'lista de marcas retornada com sucesso',
  content: {
    'application/json': {
      example: {
        data: [
          {
            id: 1,
            nome: 'Cristal',
          },
          {
            id: 2,
            nome: 'Tio Jorger',
          },
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 1,
        },
      },
    },
  },
};
