export interface SearchCategoriaDto {
  limit?: number;
  page?: number;
  nome?: string;
}

export interface CategoriasResult {
  data: Categorias[];
  meta: Meta;
}

export interface Categorias {
  id: number;
  nome: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
}

export interface CreateCategoriaDto {
  nome: string;
}

export interface UpdateCategoriaDto {
  nome: string;
}

export interface CategoriaResponse {
  message: string;
  data: Categorias;
}
