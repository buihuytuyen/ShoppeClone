import { User } from '@/types/user.type';
import { SuccessReponse } from '@/types/utils.type';
import http from '@/utils/http';

interface UpdateProfileBody extends Omit<User, '_id' | 'email' | 'roles' | 'createdAt' | 'updatedAt'> {
  password?: string;
  newPassword?: string;
}

export const URL_ME = 'me';
export const URL_USER = 'user';
export const URL_UPLOAD_AVATAR = 'user/upload-avatar';

const userApi = {
  getProfile() {
    return http.get<SuccessReponse<User>>(URL_ME);
  },
  updateProfile(body: UpdateProfileBody) {
    return http.put<SuccessReponse<User>>(URL_USER, body);
  },
  uploadAvatar(body: FormData) {
    return http.post<SuccessReponse<string>>(URL_UPLOAD_AVATAR, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default userApi;
