import { ApiResponseOptions } from '@nestjs/swagger';

export const createCategoria: ApiResponseOptions = {
  description: 'Categoria criado com sucesso',
};
export const updateCategoria: ApiResponseOptions = {
  description: 'Categoria atualizado com sucesso',
};
export const deletesCategoria: ApiResponseOptions = {
  description: 'Categoria deletado com sucesso',
};

export const getListJsonCategorias: ApiResponseOptions = {
  description: 'lista de categorias retornada com sucesso',
  content: {
    'application/json': {
      example: {
        data: [
          {
            id: 1,
            nome: 'Latícinios',
          },
          {
            id: 2,
            nome: 'Granãos',
          },
        ],
      },
    },
  },
};
