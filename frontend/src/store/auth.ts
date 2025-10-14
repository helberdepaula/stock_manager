import { defineStore } from 'pinia'
import { authService, type LoginCredentials, type UserProfile } from '@/services/auth'
import { ApiErrorHandler, type ApiError } from '@/services/error-handler'

interface AuthState {
  user: UserProfile | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: ApiError | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('auth_token'),
    refreshToken: localStorage.getItem('refresh_token'),
    isAuthenticated: !!localStorage.getItem('auth_token'),
    isLoading: false,
    error: null
  }),

  actions: {
    async login(credentials: LoginCredentials): Promise<boolean> {
      this.isLoading = true
      this.error = null

      try {
        const response = await authService.login(credentials)
        
        this.token = response.access_token
        this.refreshToken = response.refresh_token
        this.isAuthenticated = true

        localStorage.setItem('auth_token', response.access_token)
        localStorage.setItem('refresh_token', response.refresh_token)
        
        await this.loadProfile()
        
        return true
      } catch (error) {
        this.error = ApiErrorHandler.handle(error)
        this.user = null
        this.token = null
        this.isAuthenticated = false
        
        localStorage.removeItem('auth_token')
        localStorage.removeItem('refresh_token')
        
        return false
      } finally {
        this.isLoading = false
      }
    },

    async loadProfile(): Promise<void> {
      if (!this.token) return

      this.isLoading = true
      this.error = null

      try {
        const profile = await authService.getProfile()
        this.user = profile
        this.isAuthenticated = true
      } catch (error) {
        this.error = ApiErrorHandler.handle(error)
        this.logout()
      } finally {
        this.isLoading = false
      }
    },

    async refreshUserToken(): Promise<boolean> {
      if (!this.refreshToken) {
        this.logout()
        return false
      }

      try {
        const response = await authService.refreshToken({
          refresh_token: this.refreshToken
        })

        this.token = response.access_token
        this.refreshToken = response.refresh_token
        this.isAuthenticated = true

        localStorage.setItem('auth_token', response.access_token)
        localStorage.setItem('refresh_token', response.refresh_token)
        
        await this.loadProfile()
        
        return true
      } catch (error) {
        this.logout()
        return false
      }
    },

    logout(): void {
      this.user = null
      this.token = null
      this.refreshToken = null
      this.isAuthenticated = false
      this.error = null

      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')
    },

    clearError(): void {
      this.error = null
    }
  },

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && !!state.token,
    currentUser: (state) => state.user,
    hasRole: (state) => (role: string) => state.user?.perfil === role,
    userRole: (state) => state.user?.perfil ?? '',
    authError: (state) => state.error
  }
})
