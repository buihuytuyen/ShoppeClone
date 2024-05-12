import UrlPath from '@/constants/path';
import { AuthReponse } from '@/types/auth.type';
import http from '@/utils/http';

const authApi = {
  registerAccount: (body: { email: string; password: string }) => http.post<AuthReponse>(UrlPath.Register, body),

  login: (body: { email: string; password: string }) => http.post<AuthReponse>(UrlPath.Login, body),

  logout: () => http.post(UrlPath.Logout)
};

export default authApi;
