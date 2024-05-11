import UrlPath from '@/constants/path';
import { AuthReponse } from '@/types/auth.type';
import http from '@/utils/http';

export const registerAccount = (body: { email: string; password: string }) =>
  http.post<AuthReponse>(UrlPath.Register, body);

export const login = (body: { email: string; password: string }) => http.post<AuthReponse>(UrlPath.Login, body);

export const logout = () => http.post(UrlPath.Logout);
