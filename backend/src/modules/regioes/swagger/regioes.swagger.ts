import { ApiResponseOptions } from '@nestjs/swagger';

export const getListJsonRegioes: ApiResponseOptions = {
  description: 'lista de regiões retornada com sucesso',
  content: {
    'application/json': {
      example: {
        data: [
          {
            id: 1,
            nome: 'nodeste',
          },
        ],
      },
    },
  },
};