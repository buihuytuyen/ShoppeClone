import purchaseApi from '@/apis/purchase.api';
import Button from '@/components/Botton';
import QuantityController from '@/components/QuantityController';
import UrlPath from '@/constants/path';
import { PurchasesStatus } from '@/constants/purchase';
import { formatCurrency, generateNameId } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status: PurchasesStatus.InCart }],
    queryFn: () => purchaseApi.getPurchases({ status: PurchasesStatus.InCart })
  });

  const purcharseInCart = purchaseInCartData?.data.data;

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid shrink-0 grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input type='checkbox' className='h-5 w-5 accent-orange' />
                    <div className='ml-2 flex-grow text-black'>Sản phẩm</div>
                  </div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {purcharseInCart?.map((purchase) => (
                <div
                  className='mb-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
                  key={purchase._id}
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input type='checkbox' className='h-5 w-5 accent-orange' />
                      </div>
                      <div className='ml-2 flex-grow'>
                        <div className='flex items-center'>
                          <Link
                            to={`${UrlPath.Home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                            className='h-20 w-20 flex-shrink-0 rounded-sm shadow-sm'
                          >
                            <img src={purchase.product.image} alt={purchase.product.name} />
                          </Link>
                          <div className='flex-grow px-5 pb-2 pt-1'>
                            <Link
                              to={`${UrlPath.Home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                              className='line-clamp-2'
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6 flex items-center'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>
                            {formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='ml-3'>{formatCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          classNameWrapper='flex items-center'
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange'>
                          ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                      <div className='col-span-1'>
                        <button className='bg-none text-black transition-colors hover:text-orange'>Xóa</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border-gray-100 bg-white p-5 pl-9 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex-shrink-0 items-center justify-center'>
              <input type='checkbox' className='h-5 w-5 accent-orange' />
            </div>
            <button className='mx-3 border-none bg-none'>Chọn tất cả</button>
            <button className='mx-3 border-none bg-none'>Xóa</button>
          </div>
          <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán (0 sản phẩm):</div>
                <div className='ml-2 text-2xl text-orange'>₫138000</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>₫38000</div>
              </div>
            </div>
            <Button className='mt-5 h-10 w-52 rounded-sm bg-red-500 text-center text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
