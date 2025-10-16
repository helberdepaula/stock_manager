import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "@/store/auth";

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const authStore = useAuthStore();

  //document.title = "Estoques";
  if (to.path != "/login" && !authStore.isLoggedIn) {
    next("/login");
    return;
  }

  if (to.path == "/login" && authStore.isLoggedIn) {
    next("/");
    return;
  }

  next();
};

export const guestGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  const authStore = useAuthStore();

  if (to.meta.isGuest && authStore.isLoggedIn) {
    next("/");
    return;
  }

  next();
};
