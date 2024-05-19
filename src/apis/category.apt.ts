import { Category } from '@/types/category.type';
import { SuccessReponse } from '@/types/utils.type';
import http from '@/utils/http';

const URL = 'categories';

const categoryApi = {
  getCategories() {
    return http.get<SuccessReponse<Category[]>>(URL);
  }
};

export default categoryApi;
