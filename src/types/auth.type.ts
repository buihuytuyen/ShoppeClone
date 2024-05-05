import { User } from '@/types/user.type';
import { ReponseApi } from '@/types/utils.type';

export type AuthReponse = ReponseApi<{
  access_token: string;
  expires: string;
  user: User;
}>;
