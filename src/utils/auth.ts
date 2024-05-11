export const saveAssceeTokenToLs = (access_token: string) => {
  localStorage.setItem('access_token', access_token);
};

export const clearAccessTokenFromLs = () => {
  localStorage.removeItem('access_token');
};

export const getAccessTokenFromLs = () => {
  return localStorage.getItem('access_token') || '';
};
