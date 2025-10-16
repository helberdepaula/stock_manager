import { authService } from "@/service/auth.service";
import { ApiErrorHandler } from "@/service/error-handler-exceptions";
import type { ApiError } from "@/types/api-error-handler-type";
import type { UserProfile } from "@/types/auth.type";
import { defineStore } from "pinia";

export interface IAuthLogin {
  password: string;
  email: string;
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: ApiError | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem("auth_token"),
    refreshToken: localStorage.getItem("refresh_token"),
    isAuthenticated: !!localStorage.getItem("auth_token"),
    isLoading: false,
    error: null,
  }),
  actions: {
    async login(credentials: IAuthLogin): Promise<boolean> {
      this.error = null;
      this.isLoading = false;
      try {
        //criando o service para o request dar api
        console.log(credentials);
        const response = await authService.login(credentials);

        this.token = response.access_token;
        this.refreshToken = response.refresh_token;
        this.isAuthenticated = true;
        await this.loadProfile();

        return true;
      } catch (error) {
        this.error = ApiErrorHandler.handle(error);
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
        throw error;
      }
    },
    async loadProfile(): Promise<void> {
      if (!this.token) return;
      this.isLoading = true;
      this.error = null;
      try {
        const profile = await authService.getProfile();
        this.user = profile;
        this.isAuthenticated = true;
      } catch (error) {
        this.error = ApiErrorHandler.handle(error);
        this.logout();
      } finally {
        this.isLoading = false;
      }
    },
    async refreshUserToken(): Promise<boolean> {
      if (!this.refreshToken) {
        this.logout();
        return false;
      }

      try {
        const response = await authService.refreshToken({
          refresh_token: this.refreshToken,
        });

        this.token = response.access_token;
        this.refreshToken = response.refresh_token;
        this.isAuthenticated = true;

        await this.loadProfile();

        return true;
      } catch (error) {
        this.logout();
        return false;
      }
    },
    logout(): void {
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      this.isAuthenticated = false;
      this.error = null;
    },
    clearError(): void {
      this.error = null;
    },
  },
  getters: {
    isLoggedIn: (state) => {
      return state.isAuthenticated && !!state.token;
    },
    currentUser: (state) => state.user,
    hasRole: (state) => (role: string) => state.user?.perfil === role,
    userRole: (state) => state.user?.perfil ?? "",
    authError: (state) => state.error,
  },
  persist: true,
});
