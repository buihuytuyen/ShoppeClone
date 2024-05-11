import { User } from '@/types/user.type';

export const saveAccessTokenToLs = (access_token: string) => {
  localStorage.setItem('access_token', access_token);
};

export const clearAccessTokenFromLs = () => {
  localStorage.removeItem('access_token');
};

export const getAccessTokenFromLs = () => {
  return localStorage.getItem('access_token') || '';
};

export const getProfileFromLS = (): User | null => {
  const profile = localStorage.getItem('profile');
  if (profile) {
    return JSON.parse(profile);
  }
  return null;
};

export const saveProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile));
};

export const clearProfileFromLS = () => {
  localStorage.removeItem('profile');
};

export const clearLS = () => {
  clearAccessTokenFromLs();
  clearProfileFromLS();
};
