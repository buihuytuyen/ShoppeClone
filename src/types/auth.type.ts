import { User } from '@/types/user.type';
import { ErrorReponse, SuccessReponse } from '@/types/utils.type';

export type AuthResSuccess = SuccessReponse<{
  access_token: string;
  refresh_token: string;
  expires_refresh_token: number;
  expires: number;
  user: User;
}>;

export type RefreshTokenResSuccess = SuccessReponse<{ access_token: string; expires: number }>;

export type RefreshTokenResError = ErrorReponse<{ message: string; name: string }>;
