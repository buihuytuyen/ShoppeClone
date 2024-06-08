import { Purchase, PurchaseListStatus } from '@/types/purchase.type';
import { SuccessReponse } from '@/types/utils.type';
import http from '@/utils/http';

export const URL_PURCHASE = 'purchases';

export const URL_ADD_TO_CART = 'purchases/add-to-cart';

export const URL_BUY_PRODUCTS = 'purchases/buy-products';

export const URL_UPDATE_PURCHASE = 'purchases/update-purchase';

const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<SuccessReponse<Purchase>>(URL_ADD_TO_CART, body);
  },
  getPurchases: (params: { status: PurchaseListStatus }) => {
    return http.get<SuccessReponse<Purchase[]>>(URL_PURCHASE, { params });
  },
  buyProducts: (body: { product_id: string; buy_count: number }[]) => {
    return http.post<SuccessReponse<Purchase[]>>(URL_BUY_PRODUCTS, body);
  },
  updatePurchas: (body: { product_id: string; buy_count: number }) => {
    return http.put<SuccessReponse<Purchase>>(URL_UPDATE_PURCHASE, body);
  },
  deletePurchases: (purchaseIds: string[]) => {
    return http.delete<SuccessReponse<{ deleted_count: number }>>(URL_PURCHASE, {
      data: purchaseIds
    });
  }
};

export default purchaseApi;
