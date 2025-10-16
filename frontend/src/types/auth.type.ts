export interface Endereco {
  id: number;
  municipio_id: number;
  logradouro: string;
  cep: string;
  numero: string;
  complemento: string;
  bairro: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  createdAt: string;
  updatedAt: string;
  endereco: Endereco;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface RefreshTokenCredentials {
  refresh_token: string
}
