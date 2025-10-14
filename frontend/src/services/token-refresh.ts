import type { AxiosResponse, AxiosError } from 'axios'
import { apiService } from '@/services/api'
import { useAuthStore } from '@/store/auth'

let isRefreshing = false
let refreshSubscribers: Array<(token: string) => void> = []

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb)
}

const onRefreshed = (token: string) => {
  refreshSubscribers.map(cb => cb(token))
  refreshSubscribers = []
}

export const setupTokenRefreshInterceptor = () => {
  apiService['instance'].interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const { config, response } = error
      const authStore = useAuthStore()

      if (response?.status === 401 && !config?.url?.includes('/auth/')) {
        if (!isRefreshing) {
          isRefreshing = true

          try {
            const success = await authStore.refreshUserToken()
            
            if (success && authStore.token) {
              onRefreshed(authStore.token)
              isRefreshing = false
              
              if (config && config.headers) {
                config.headers.Authorization = `Bearer ${authStore.token}`
                return apiService['instance'](config)
              }
            } else {
              authStore.logout()
              window.location.href = '/login'
            }
          } catch {
            authStore.logout()
            window.location.href = '/login'
            isRefreshing = false
          }
        } else {
          return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
              if (config && config.headers) {
                config.headers.Authorization = `Bearer ${token}`
                resolve(apiService['instance'](config))
              }
            })
          })
        }
      }

      return Promise.reject(error)
    }
  )
}