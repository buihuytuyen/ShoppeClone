const UrlPath = {
  Home: '/',
  Login: '/login',
  Register: '/register',
  Logout: '/logout',
  Profile: '/profile',
  ProductDetail: ':id'
} as const;

export default UrlPath;
