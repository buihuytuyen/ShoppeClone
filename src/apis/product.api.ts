import { Product, ProductList, ProductListConfig } from '@/types/product.type';
import { SuccessReponse } from '@/types/utils.type';
import http from '@/utils/http';

const URL = 'products';

const productApi = {
  getProducts: (config: ProductListConfig) => {
    return http.get<SuccessReponse<ProductList>>(URL, { params: config });
  },
  getProductDetail: (id: string) => {
    http.get<SuccessReponse<Product>>(`${URL}/${id}`);
  }
};

export default productApi;
