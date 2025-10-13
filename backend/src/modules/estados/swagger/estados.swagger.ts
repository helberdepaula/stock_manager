import { ApiResponseOptions } from '@nestjs/swagger';

export const getListJsonEstados: ApiResponseOptions = {
  description: 'lista de estados retornada com sucesso',
  content: {
    'application/json': {
      example: {
        data: [
          {
            id: 1,
            nome: 'Goiás',
            uf: 'GO',
            regiao_id: 1,
          },
        ],
      },
    },
  },
};
