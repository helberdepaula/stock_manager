import { ApiResponseOptions } from '@nestjs/swagger';

export const getListJsonUnidades: ApiResponseOptions = {
  description: 'lista de unidades retornada com sucesso',
  content: {
    'application/json': {
      example: {
        data: [
          {
            id: 1,
            nome: 'gramas',
          },
        ],
      },
    },
  },
};