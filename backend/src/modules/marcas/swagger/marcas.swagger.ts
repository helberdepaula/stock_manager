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

export const createrMarcas: ApiResponseOptions = {
  description: 'Marca criada com sucesso',
  content: {
    'application/json': {
      example: {
        message: 'Marca criada com sucesso',
        data: {
          nome: 'cadstloess',
          createdAt: '2025-10-15T19:55:09.986Z',
          updatedAt: '2025-10-15T19:55:09.986Z',
          id: 3,
          status: 'ACTIVE',
        },
      },
    },
  },
};

export const updateMarcas: ApiResponseOptions = {
  description: 'Marca Atualizada com sucesso',
  content: {
    'application/json': {
      example: {
        message: 'Marca Atualizada com sucesso',
        data: {
          nome: 'cadstloess',
          createdAt: '2025-10-15T19:55:09.986Z',
          updatedAt: '2025-10-15T19:55:09.986Z',
          id: 3,
          status: 'ACTIVE',
        },
      },
    },
  },
};
