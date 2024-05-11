import { User } from '@/types/user.type';
import { SuccessReponse } from '@/types/utils.type';

export type AuthReponse = SuccessReponse<{
  access_token: string;
  expires: string;
  user: User;
}>;
