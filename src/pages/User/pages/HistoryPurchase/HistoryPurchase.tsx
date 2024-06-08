import purchaseApi from '@/apis/purchase.api';
import Routes from '@/constants/path';
import { PurchasesStatus } from '@/constants/purchase';
import useQueryParams from '@/hooks/useQueryParams';
import { PurchaseListStatus } from '@/types/purchase.type';
import { formatCurrency, generateNameId } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { createSearchParams, Link } from 'react-router-dom';

const purchaseTabs = [
  { status: PurchasesStatus.All, name: 'Tất cả' },
  { status: PurchasesStatus.WaitForConfirmation, name: 'Chờ xác nhận' },
  { status: PurchasesStatus.WaitForGetting, name: 'Chờ lấy hàng' },
  { status: PurchasesStatus.InProgress, name: 'Đang giao' },
  { status: PurchasesStatus.Delivered, name: 'Đã giao' },
  { status: PurchasesStatus.Cancelled, name: 'Đã hủy' }
];

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams();
  const statusQuery = (Number(queryParams.status) || PurchasesStatus.All) as PurchaseListStatus;

  const { data: purchaseData } = useQuery({
    queryKey: ['purchases', { status: statusQuery }],
    queryFn: () => purchaseApi.getPurchases({ status: statusQuery })
  });

  const purchases = purchaseData?.data.data;

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>
            {purchaseTabs.map(({ status, name }) => (
              <Link
                key={status}
                to={{
                  pathname: Routes.HistoryPurchase,
                  search: createSearchParams({
                    status: String(status)
                  }).toString()
                }}
                className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
                  'border-b-orange text-orange': statusQuery === status,
                  'border-b-black/10 text-gray-900': statusQuery !== status
                })}
              >
                {name}
              </Link>
            ))}
          </div>
          <div>
            {purchases?.map((purchase) => (
              <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link
                  to={`${Routes.Home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex'
                >
                  <div className='flex-shrink-0'>
                    <img src={purchase.product.image} className='h-20 w-20 object-cover' alt={purchase.product.name} />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>x{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      ₫{formatCurrency(purchase.product.price_before_discount)}
                    </span>
                    <span className='ml-2 truncate text-orange'>₫{formatCurrency(purchase.product.price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>Tổng giá tiền</span>
                    <span className='ml-4 text-xl text-orange'>
                      ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
