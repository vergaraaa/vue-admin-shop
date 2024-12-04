import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../interfaces/auth-status.enum';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  await authStore.checkAuth();

  if (authStore.authStatus === AuthStatus.Unauthenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
};

export default isAuthenticatedGuard;
