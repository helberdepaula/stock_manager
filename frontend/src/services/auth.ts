import { apiService } from './api'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
}

export interface UserProfile {
  id: number
  email: string
  nome: string
  perfil: string
}

export interface RefreshTokenCredentials {
  refresh_token: string
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/login', credentials)
  }

  async getProfile(): Promise<UserProfile> {
    return apiService.get<UserProfile>('/auth/profile')
  }

  async refreshToken(credentials: RefreshTokenCredentials): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/refresh', credentials)
  }
}

export const authService = new AuthService()