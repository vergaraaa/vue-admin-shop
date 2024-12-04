import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const isAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  await authStore.checkAuth();

  if (authStore.isAdmin) {
    next();
  } else {
    next({ name: 'home' });
  }
};

export default isAdminGuard;
