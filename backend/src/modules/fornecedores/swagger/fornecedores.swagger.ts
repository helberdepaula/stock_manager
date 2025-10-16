import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';

export const getlistFornecedoresResponse: ApiResponseOptions = {
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
  id: 4,
  nome: 'Pedro Castilho Dantra',
  endereco_id: 12,
  created_at: '2025-10-10T15:28:00.336Z',
  updated_at: '2025-10-10T15:28:00.336Z',
};

export const getUserDetail: ApiResponseOptions = {
  description: 'Registro de um fornecedor',
  content: {
    'application/json': {
      example: DetailObjet,
    },
  },
};

export const createrFornecedores: ApiResponseOptions = {
  description: 'Fornecedor criado com sucesso',
  content: {
    'application/json': {
      example: {
        message: 'Fornecedor cadastro com sucesso',
        ...DetailObjet,
      },
    },
  },
};

export const updateFornecedor: ApiResponseOptions = {
  description: 'Fornecedor atulizado com sucesso',
  content: {
    'application/json': {
      example: {
        message: 'Fornecedor atualizado com sucesso',
        ...DetailObjet,
      },
    },
  },
};

export const deletesFornecedor: ApiResponseOptions = {
  description: 'Fornecedor deletado com sucesso',
};

export const listContatoFornecedor: ApiResponseOptions = {
  description: 'Obtem uma lista de contatos do fornecedor',
  content: {
    'application/json': {
      example: {
        message: 'btem uma lista de contatos do fornecedor',
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

export const createrCotnatoFornecedores: ApiResponseOptions = {
  description: 'Contato do fornecedor foi criado com sucesso',
  content: {
    'application/json': {
      example: {
        message: 'Contato do fornecedor foi criado com sucesso',
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
