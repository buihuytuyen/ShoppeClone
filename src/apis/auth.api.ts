import { AuthResSuccess } from '@/types/auth.type';
import http from '@/utils/http';

export const URL_LOGIN = 'login';
export const URL_REGISTER = 'register';
export const URL_LOGOUT = 'logout';
export const URL_REFRESH_ACCESS_TOKEN = 'refresh-access-token';

const authApi = {
  registerAccount: (body: { email: string; password: string }) => http.post<AuthResSuccess>(URL_REGISTER, body),

  login: (body: { email: string; password: string }) => http.post<AuthResSuccess>(URL_LOGIN, body),

  logout: () => http.post(URL_LOGOUT),

  refreshToken: (refresh_token: string) => http.post<AuthResSuccess>(URL_REFRESH_ACCESS_TOKEN, { refresh_token })
};

export default authApi;
