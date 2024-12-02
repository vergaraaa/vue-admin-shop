import { isAxiosError } from 'axios';

import { tesloApi } from '@/api/tesloApi';
import type { User } from '../interfaces/user.interface';
import type { AuthResponse } from '../interfaces/auth.response';

interface LoginError {
  ok: false;
  message: string;
}

interface LoginSuccess {
  ok: true;
  user: User;
  token: string;
}

export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginSuccess | LoginError> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return { ok: false, message: 'Unauthorized' };
    }

    console.log(error);

    throw new Error('Error on login ');
  }
};
