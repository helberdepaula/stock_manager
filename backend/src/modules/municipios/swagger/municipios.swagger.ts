import { ApiResponseOptions } from '@nestjs/swagger';

export const getListJsonMunicipios: ApiResponseOptions = {
  description: 'lista de municipios retornada com sucesso',
  content: {
    'application/json': {
      example: {
        data: [
          {
            id: 1100056,
            nome: 'Cerejeiras',
            estado_id: 11,
          },
        ],
      },
    },
  },
};
