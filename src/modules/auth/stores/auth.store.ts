import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';

import { loginAction } from '../actions/login.action';
import type { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { registerAction } from '../actions/register.action';
import { checkAuthAction } from '../actions/check-auth.action';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);

      if (!loginResponse.ok) {
        logout();
        return false;
      }

      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      console.log(error);

      logout();
    }
  };

  const register = async (fullname: string, email: string, password: string) => {
    try {
      const registerResponse = await registerAction(fullname, email, password);

      if (!registerResponse.ok) {
        logout();
        return { ok: false, message: registerResponse.message };
      }

      user.value = registerResponse.user;
      token.value = registerResponse.token;
      authStatus.value = AuthStatus.Authenticated;

      return { ok: true };
    } catch (error) {
      console.log(error);
      return { ok: false, message: 'Error on register' };
    }
  };

  const logout = () => {
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';

    return false;
  };

  const checkAuth = async (): Promise<boolean> => {
    try {
      const statusResponse = await checkAuthAction();

      if (!statusResponse.ok) {
        logout();
        return false;
      }

      user.value = statusResponse.user;
      token.value = statusResponse.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch {
      logout();
      return false;
    }
  };

  return {
    user,
    token,
    authStatus,

    // getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),

    // Todo: getter to know user role

    username: computed(() => user.value?.fullname),

    // actions
    login,
    register,
    checkAuth,
  };
});
