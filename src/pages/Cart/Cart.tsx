import purchaseApi from '@/apis/purchase.api';
import Button from '@/components/Botton';
import QuantityController from '@/components/QuantityController';
import UrlPath from '@/constants/path';
import { PurchasesStatus } from '@/constants/purchase';
import { formatCurrency, generateNameId } from '@/utils/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Purchase } from '@/types/purchase.type';
import { produce } from 'immer';
import { keyBy } from 'lodash';
import { toast } from 'react-toastify';
import noProductInCart from '@/assets/images/no-product-in-cart.png';

interface ExtendedPurchase extends Purchase {
  disabled: boolean;
  checked: boolean;
}

export default function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([]);

  const { data: purchaseInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: PurchasesStatus.InCart }],
    queryFn: () => purchaseApi.getPurchases({ status: PurchasesStatus.InCart })
  });

  const purcharseInCart = purchaseInCartData?.data.data;

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const purchasePreKeyBy = keyBy(prev, '_id');

      return (
        purcharseInCart?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(purchasePreKeyBy[purchase._id]?.checked)
        })) || []
      );
    });
  }, [purcharseInCart]);

  const isAllChecked = extendedPurchases.length > 0 && extendedPurchases.every((purchase) => purchase.checked);
  const checkedPurchases = extendedPurchases.filter((purchase) => purchase.checked);
  const checkedPurchasesCount = checkedPurchases.length;
  const totalCheckedPurchasePrices = checkedPurchases.reduce(
    (total, purchase) => total + purchase.product.price * purchase.buy_count,
    0
  );

  const totalCheckedPurchaseSavingPrices = checkedPurchases.reduce(
    (total, purchase) => total + (purchase.price_before_discount - purchase.product.price) * purchase.buy_count,
    0
  );

  const updatePurcharMutation = useMutation({
    mutationFn: purchaseApi.updatePurchas,
    onSuccess: () => {
      refetch();
    }
  });

  const deletePurcharMutation = useMutation({
    mutationFn: purchaseApi.deletePurchases,
    onSuccess: () => {
      refetch();
    }
  });

  const buyPurcharMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: () => {
      refetch();
    }
  });

  const handleBuyPurchase = () => {
    if (checkedPurchasesCount === 0) return;
    const purchaseIds = checkedPurchases.map((purchase) => ({
      product_id: purchase.product._id,
      buy_count: purchase.buy_count
    }));
    buyPurcharMutation.mutate(purchaseIds, {
      onSuccess: (data) => {
        toast.success(data.data.message, { autoClose: 3000, position: 'top-center' });
      }
    });
  };

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id;
    deletePurcharMutation.mutate([purchaseId]);
  };

  const handleDeleteMany = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id);
    deletePurcharMutation.mutate(purchaseIds);
  };

  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked;
      })
    );
  };

  const handleCheckAll = () => {
    setExtendedPurchases((prev) => prev.map((purchase) => ({ ...purchase, checked: !isAllChecked })));
  };

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex];
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true;
        })
      );
      updatePurcharMutation.mutate({ product_id: purchase.product._id, buy_count: value });
    }
  };

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value;
      })
    );
  };

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {extendedPurchases.length > 0 && (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid shrink-0 grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 cursor-pointer accent-orange'
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
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
                  {extendedPurchases.map((purchase, index) => (
                    <div
                      className='mb-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
                      key={purchase._id}
                    >
                      <div className='col-span-6'>
                        <div className='flex'>
                          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                            <input
                              type='checkbox'
                              className='h-5 w-5 cursor-pointer accent-orange'
                              checked={purchase.checked}
                              onChange={handleChecked(index)}
                            />
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
                              onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                              onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                              onTyping={handleTypeQuantity(index)}
                              onFocusOut={(value) =>
                                handleQuantity(
                                  index,
                                  value,
                                  value <= purchase.product.quantity &&
                                    value >= 1 &&
                                    value !== (purcharseInCart as Purchase[])[index].buy_count
                                )
                              }
                              disabled={purchase.disabled}
                              disableDecrease={purchase.disabled}
                              disableIncrease={purchase.disabled}
                            />
                          </div>
                          <div className='col-span-1'>
                            <span className='text-orange'>
                              ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                            </span>
                          </div>
                          <div className='col-span-1'>
                            <button
                              onClick={handleDelete(index)}
                              className='bg-none text-black transition-colors hover:text-orange'
                            >
                              Xóa
                            </button>
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
                  <input
                    type='checkbox'
                    className='h-5 w-5 cursor-pointer accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <button className='mx-3 border-none bg-none'>{`Chọn tất cả (${extendedPurchases.length})`}</button>
                <button onClick={handleDeleteMany} className='mx-3 border-none bg-none'>
                  Xóa
                </button>
              </div>
              <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div className='text-nowrap'>{`Tổng thanh toán (${checkedPurchasesCount} sản phẩm):`}</div>
                    <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasePrices)}</div>
                  </div>
                  <div className='flex items-center text-sm sm:justify-end'>
                    <div className='text-nowrap text-gray-500'>Tiết kiệm</div>
                    <div className='ml-6 text-orange'>₫{formatCurrency(totalCheckedPurchaseSavingPrices)}</div>
                  </div>
                </div>
                <Button
                  onClick={handleBuyPurchase}
                  disabled={buyPurcharMutation.isPending || checkedPurchasesCount === 0}
                  className='mt-5  text-nowrap rounded-sm bg-red-500 px-10 py-2 text-center text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </>
        )}
        {extendedPurchases.length === 0 && (
          <div className='flex h-[21rem] flex-col items-center justify-center'>
            <img src={noProductInCart} alt='no-product-in-cart' className='h-[6.125rem] w-[6.75rem]' />
            <div className='mt-[1.125rem] text-[0.875rem] font-bold leading-[1rem] text-black/40'>
              Giỏ hàng của bạn còn trống
            </div>
            <Link
              to='/'
              className='mt-[1.0625rem] cursor-pointer rounded-[2px] bg-orange px-[2.625rem] py-[.625rem] text-[.875rem] font-light uppercase leading-[1] text-white shadow-sm'
            >
              Mua Ngay
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
