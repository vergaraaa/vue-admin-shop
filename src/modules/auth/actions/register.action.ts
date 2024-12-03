import { tesloApi } from '@/api/tesloApi';
import type { User } from '../interfaces/user.interface';
import type { AuthResponse } from '../interfaces/auth.response';

interface RegisterError {
  ok: false;
  message: string;
}

interface RegisterSuccess {
  ok: true;
  user: User;
  token: string;
}

export const registerAction = async (
  fullname: string,
  email: string,
  password: string,
): Promise<RegisterSuccess | RegisterError> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullname,
      email,
      password,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    console.log(error);

    return { ok: false, message: 'Error creating user' };
  }
};
