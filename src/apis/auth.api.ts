import { AuthReponse } from '@/types/auth.type';
import http from '@/utils/http';

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthReponse>('/register', body);
