const Routes = {
  Home: '/',
  Login: '/login',
  Register: '/register',
  Logout: '/logout',
  Profile: '/user/profile',
  ChangePassword: '/user/password',
  HistoryPurchase: '/user/purchase',
  ProductDetail: ':nameId',
  Category: '/categories',
  Cart: '/cart',
  User: '/user'
} as const;

export default Routes;
