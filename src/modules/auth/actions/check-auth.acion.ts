import { isAxiosError } from 'axios';

import { tesloApi } from '@/api/tesloApi';
import type { User } from '../interfaces/user.interface';
import type { AuthResponse } from '../interfaces/auth.response';

interface CheckAuthError {
  ok: false;
}

interface CheckAuthSuccess {
  ok: true;
  user: User;
  token: string;
}

export const checkAuthAction = async (): Promise<CheckAuthSuccess | CheckAuthError> => {
  try {
    const localToken = localStorage.getItem('token');

    if (localToken && localToken.length < 10) return { ok: false };

    const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return { ok: false };
    }

    throw new Error('Error checking session');
  }
};
