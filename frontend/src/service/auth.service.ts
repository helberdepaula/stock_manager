import type {
  AuthResponse,
  LoginCredentials,
  RefreshTokenCredentials,
  UserProfile,
} from "@/types/auth.type";
import { apiService } from "./requet-service";

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiService.post<AuthResponse>("/auth/login", credentials);
  }

  async getProfile(): Promise<UserProfile> {
    return apiService.get<UserProfile>("/auth/profile");
  }

  async refreshToken(
    credentials: RefreshTokenCredentials
  ): Promise<AuthResponse> {
    return apiService.post<AuthResponse>("/auth/refresh", credentials);
  }
}

export const authService = new AuthService();
