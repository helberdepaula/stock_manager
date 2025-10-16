import { useAuthStore } from '@/store/auth'
import type { LoginCredentials } from '@/types/auth.type'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  const isAuthenticated = computed(() => authStore.isLoggedIn)
  const user = computed(() => authStore.currentUser)
  const isLoading = computed(() => authStore.isLoading)
  const error = computed(() => authStore.authError)

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    const success = await authStore.login(credentials)
    
    if (success) {
      router.push('/')
    }
    
    return success
  }

  const logout = async (): Promise<void> => {
    authStore.logout()
    router.push('/login')
  }

  const hasRole = (role: string): boolean => {
    return authStore.hasRole(role)
  }

  const isAdmin = (): boolean => {
    return authStore.hasRole('ADMIN')
  }

  const clearError = (): void => {
    authStore.clearError()
  }

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    login,
    logout,
    hasRole,
    isAdmin,
    clearError
  }
}