import UrlPath from '@/constants/path';
import { Category } from '@/types/category.type';
import { SuccessReponse } from '@/types/utils.type';
import http from '@/utils/http';

const categoryApi = {
  getCategories() {
    return http.get<SuccessReponse<Category[]>>(UrlPath.Category);
  }
};

export default categoryApi;
