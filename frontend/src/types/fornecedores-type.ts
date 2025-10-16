export interface SearchFornecedorDto {
  cnpj?: string;
  nome?: string;
  limit?: number;
  page?: number;
}

export interface FornecedoreResult {
  data: Fornecedor[];
  meta: Meta;
}

export interface Municipio {
  id: number;
  nome: string;
  createdAt: string;
  updatedAt: string;
  estado: Estado;
}

export interface Estado {
  id: number;
  nome: string;
  uf: string;
  createdAt: string;
  updatedAt: string;
}

export interface endereco {
  id: number;
  municipio_id: number;
  logradouro: string;
  cep: string;
  numero: any;
  complemento: any;
  bairro: string;
  createdAt: string;
  updatedAt: string;
  municipio: Municipio;
}

export interface Fornecedor {
  id: number;
  cnpj: string;
  nome: string;
  status: string;
  endereco_id: number;
  createdAt: string;
  updatedAt: string;
  endereco: endereco;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
}

export interface CreateFornecedorDto {
  cnpj: string;
  nome: string;
  municipio_id: number;
  estado_id: number;
  logradouro: string;
  cep: string;
  numero: string;
  complemento: string;
  bairro: string;
}

export interface UpdateFornecedorDto {
  cnpj?: string;
  nome?: string;
  municipio_id?: number;
  logradouro?: string;
  cep?: string;
  numero?: string;
  complemento: string;
  bairro?: string;
}

export interface FornecedorCreateResponse {
  message: string;
  data: Fornecedor;
}

export interface FornecedorDeleteResponse {
  message: string;
}

export interface FornecedorUpdateResponse {
  message: string;
  data: Fornecedor;
}

export interface ContatosFornecedor {
  data: Contato[];
}

export interface ContatosFornecedorCreateResponse {
  message: string;
  data: Contato[];
}

export interface Contato {
  id: number;
  codigo: string;
  ddd: string;
  numero: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContatoDto {
  codigo: string;
  ddd: string;
  numero: string;
}
