import UrlPath from '@/constants/path';
import { Product, ProductList, ProductListConfig } from '@/types/product.type';
import { SuccessReponse } from '@/types/utils.type';
import http from '@/utils/http';

const productApi = {
  getProducts: (config: ProductListConfig) => {
    return http.get<SuccessReponse<ProductList>>(UrlPath.Product, { params: config });
  },
  getProductDetail: (id: string) => {
    return http.get<SuccessReponse<Product>>(`${UrlPath.Product}/${id}`);
  }
};

export default productApi;
