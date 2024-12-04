import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../interfaces/auth-status.enum';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  // const userId = localStorage.getItem('userId');
  // localStorage.setItem('lastPath', to.path);

  // if (!userId) {
  //   return next({
  //     name: 'login',
  //   });
  // }

  const authStore = useAuthStore();

  await authStore.checkAuth();

  if (authStore.authStatus === AuthStatus.Authenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
};

export default isNotAuthenticatedGuard;
