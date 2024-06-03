import { User } from '@/types/user.type';
import { SuccessReponse } from '@/types/utils.type';
import http from '@/utils/http';

interface UpdateProfileBody extends Omit<User, '_id' | 'email' | 'roles' | 'createdAt' | 'updatedAt'> {
  password?: string;
  newPassword?: string;
}

const userApi = {
  getProfile() {
    return http.get<SuccessReponse<User>>('me');
  },
  updateProfile(body: UpdateProfileBody) {
    return http.put<SuccessReponse<User>>('user', body);
  },
  uploadAvatar(body: FormData) {
    return http.post<SuccessReponse<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default userApi;
