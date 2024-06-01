const UrlPath = {
  Home: '/',
  Login: '/login',
  Register: '/register',
  Logout: '/logout',
  Profile: '/user/profile',
  ChangePassword: '/user/password',
  HistoryPurchase: '/user/purchase',
  ProductDetail: ':nameId',
  Product: '/products',
  Category: '/categories',
  Purchase: '/purchases',
  AddToCart: '/add-to-cart',
  BuyProducts: '/buy-products',
  UpdatePurchase: '/update-purchase',
  Cart: '/cart',
  User: '/user'
} as const;

export default UrlPath;
