const UrlPath = {
  Home: '/',
  Login: '/login',
  Register: '/register',
  Logout: '/logout',
  Profile: '/profile',
  ProductDetail: ':nameId',
  Product: '/products',
  Category: '/categories',
  Purchase: '/purchases',
  AddToCart: '/add-to-cart',
  BuyProducts: '/buy-products',
  UpdatePurchase: '/update-purchase',
  Cart: '/cart'
} as const;

export default UrlPath;
