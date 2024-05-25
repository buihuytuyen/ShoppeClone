import UrlPath from '@/constants/path';
import { Purchase, PurchaseListStatus } from '@/types/purchase.type';
import { SuccessReponse } from '@/types/utils.type';
import http from '@/utils/http';

const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<SuccessReponse<Purchase>>(`${UrlPath.Purchase}${UrlPath.AddToCart}`, body);
  },
  getPurchases: (params: { status: PurchaseListStatus }) => {
    return http.get<SuccessReponse<Purchase[]>>(UrlPath.Purchase, { params });
  }
};

export default purchaseApi;
