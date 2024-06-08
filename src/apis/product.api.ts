import { Product, ProductList, ProductListConfig } from '@/types/product.type';
import { SuccessReponse } from '@/types/utils.type';
import http from '@/utils/http';

export const URL_PRODUCTS = 'products';

const productApi = {
  getProducts: (config: ProductListConfig) => {
    return http.get<SuccessReponse<ProductList>>(URL_PRODUCTS, { params: config });
  },
  getProductDetail: (id: string) => {
    return http.get<SuccessReponse<Product>>(`${URL_PRODUCTS}/${id}`);
  }
};

export default productApi;
