import { Category } from '@/types/category.type';
import { SuccessReponse } from '@/types/utils.type';
import http from '@/utils/http';

export const URL_CATEGORIES = 'categories';

const categoryApi = {
  getCategories() {
    return http.get<SuccessReponse<Category[]>>(URL_CATEGORIES);
  }
};

export default categoryApi;
