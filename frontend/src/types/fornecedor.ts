export interface Fornecedor {
  id: number
  cnpj: string
  nome: string
  status: 'ACTIVE' | 'INACTIVE'
  created_at: string
  updated_at: string
  endereco: {
    id: number
    logradouro: string
    numero?: string
    complemento?: string
    bairro: string
    cep: string
    municipio: {
      id: number
      nome: string
      estado: {
        id: number
        nome: string
        uf: string
        regiao: {
          id: number
          nome: string
        }
      }
    }
  }
  contatos?: Array<{
    id: number
    codigo: string
    ddd: string
    numero: string
  }>
}

export interface CreateFornecedorDto {
  cnpj: string
  nome: string
  municipio_id: number
  logradouro: string
  cep: string
  numero?: string
  complemento?: string
  bairro: string
}

export interface UpdateFornecedorDto {
  cnpj?: string
  nome?: string
  municipio_id?: number
  logradouro?: string
  cep?: string
  numero?: string
  complemento?: string
  bairro?: string
}

export interface SearchFornecedorDto {
  page?: number
  limit?: number
  search?: string
  status?: 'ACTIVE' | 'INACTIVE'
}

export interface FornecedorResponse {
  data: Fornecedor[]
  meta: {
    page: number
    limit: number
    total: number
  }
}

export interface CreateFornecedorContatoDto {
  contatos: Array<{
    codigo: string
    ddd: string
    numero: string
  }>
}

export interface ApiResponse<T = any> {
  message: string
  data?: T
}