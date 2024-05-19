const UrlPath = {
  Home: '/',
  Login: '/login',
  Register: '/register',
  Logout: '/logout',
  Profile: '/profile',
  ProductDetail: ':nameId'
} as const;

export default UrlPath;
