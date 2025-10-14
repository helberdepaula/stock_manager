import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/store/auth'

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const authStore = useAuthStore()

  if (!authStore.isLoggedIn) {
    next('/login')
    return
  }

  if (!authStore.currentUser && authStore.token) {
    try {
      await authStore.loadProfile()
      next()
    } catch {
      authStore.logout()
      next('/login')
    }
    return
  }

  next()
}

export const guestGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  const authStore = useAuthStore()

  if (authStore.isLoggedIn) {
    next('/')
    return
  }

  next()
}