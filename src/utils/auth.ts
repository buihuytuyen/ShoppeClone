import { User } from '@/types/user.type';

export const localStorageEventTarget = new EventTarget();

export const saveAccessTokenToLs = (access_token: string) => {
  localStorage.setItem('access_token', access_token);
};

export const saveRefreshTokenToLs = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token);
};

export const clearAccessTokenFromLs = () => {
  localStorage.removeItem('access_token');
};

export const clearRefreshTokenFromLs = () => {
  localStorage.removeItem('refresh_token');
};

export const getRefreshTokenFromLs = () => {
  return localStorage.getItem('refresh_token') || '';
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
  clearRefreshTokenFromLs();
  clearProfileFromLS();
  const clearLSEvent = new Event('clearLS');
  localStorageEventTarget.dispatchEvent(clearLSEvent);
};
