export interface SearchMarcaDto {
  limit?: number;
  page?: number;
  nome?: string;
}

export interface MarcasResult {
  data: Marca[];
  meta: Meta;
}

export interface Marca {
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

export interface CreateMarcaDto {
  nome: string;
}

export interface UpdateMarcaDto {
  nome: string;
}

export interface MarcaResponse {
  message: string;
  data: Marca;
}
