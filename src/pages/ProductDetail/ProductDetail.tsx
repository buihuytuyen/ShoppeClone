import productApi from '@/apis/product.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import ProductRating from '@/components/ProductRating';
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from '@/utils/utils';
import DOMPurify from 'dompurify';
import { useEffect, useMemo, useState, MouseEvent, useRef } from 'react';
import { ProductListConfig } from '@/types/product.type';
import Product from '@/pages/ProductList/components/Product';
import QuantityController from '@/components/QuantityController';
import purchaseApi from '@/apis/purchase.api';
import { PurchasesStatus } from '@/constants/purchase';
import { toast } from 'react-toastify';
import UrlPath from '@/constants/path';

export default function ProductDetail() {
  const [buyCount, setBuyCount] = useState<number>(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleBuyCount = (value: number) => {
    setBuyCount(value);
  };

  const { nameId } = useParams();
  const id = getIdFromNameId(nameId as string);
  const { data: productDetail } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  });

  const product = productDetail?.data.data;

  const queryConfig: ProductListConfig = {
    page: 1,
    limit: 20,
    category: product?.category._id
  };

  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig),
    enabled: !!product,
    staleTime: 1000 * 60 * 3
  });

  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.addToCart(body)
  });

  const [currentIndexImages, setcurrentIndexImages] = useState([0, 5]);

  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  const currentImages = useMemo(() => {
    return product ? product.images.slice(...currentIndexImages) : [];
  }, [product, currentIndexImages]);

  const addToCart = () => {
    addToCartMutation.mutate(
      { product_id: product?._id as string, buy_count: buyCount },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: PurchasesStatus.InCart }] });
          toast.success(data.data.message, {
            position: 'bottom-right',
            autoClose: 1000
          });
        }
      }
    );
  };

  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ product_id: product?._id as string, buy_count: buyCount });
    const purchase = res.data.data;
    navigate(UrlPath.Cart, { state: { purchaseId: purchase._id } });
  };

  const chooseActiveImage = (image: string) => {
    setActiveImage(image);
  };

  const next = () => {
    if (product && currentIndexImages[1] < product.images.length) {
      setcurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1]);
    }
  };

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setcurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1]);
    }
  };

  const imageRef = useRef<HTMLImageElement>(null);

  const handleZoom = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const react = event.currentTarget.getBoundingClientRect();
    const image = imageRef.current as HTMLImageElement;
    const { naturalHeight, naturalWidth } = image;

    // Cách 1
    // const { offsetX, offsetY } = event.nativeEvent;

    // Cách 2
    const offsetX = event.pageX - (react.x + window.screenX);
    const offsetY = event.pageY - (react.y + window.screenY);

    const top = offsetY * (1 - naturalHeight / react.height);
    const left = offsetX * (1 - naturalWidth / react.width);

    image.style.width = `${naturalWidth}px`;
    image.style.height = `${naturalHeight}px`;
    image.style.maxWidth = 'unset';

    image.style.top = `${top}px`;
    image.style.left = `${left}px`;

    // event bubble
    // Set pointer-events to none to allow the mouse to pass through the element.
  };

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style');
  };

  if (!product) return null;

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='rounded bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className=' absolute left-0 top-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>

              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={() => prev()}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.slice(0, 5).map((image) => (
                  <div
                    className='relative w-full cursor-pointer pt-[100%]'
                    key={image}
                    onMouseEnter={() => chooseActiveImage(image)}
                  >
                    <img
                      src={image}
                      alt={product.name}
                      className='absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover'
                    />
                    {image === activeImage && (
                      <div className='absolute inset-0 rounded-sm border-2 border-orange'></div>
                    )}
                  </div>
                ))}

                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={() => next()}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName='fill-orange text-orange h-4 w-4'
                    noneActiveClassName='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                  <div className='mx-4 h-4 w-[0.5px] bg-gray-300'></div>
                  <div>
                    <span>{formatNumberToSocialStyle(product.sold)}</span>
                    <span className='ml-1 text-gray-500'>Đã bán</span>
                  </div>
                </div>
              </div>

              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} GIẢM
                </div>
              </div>

              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  onIncrease={handleBuyCount}
                  onDecrease={handleBuyCount}
                  onTyping={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                  classNameWrapper='ml-10'
                />

                <div className='ml-6 text-sm text-gray-500'>{product.quantity} Sản phẩm có sẵn</div>
              </div>

              <div className='mt-8 flex items-center'>
                <button
                  onClick={addToCart}
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    width={15}
                    height={15}
                    stroke='#ee4d2d'
                    fill='#ee4d2d'
                    className='mr-[10px] h-5 w-5 fill-orange stroke-orange text-orange'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>

                <button
                  onClick={buyNow}
                  className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='mt-8 rounded bg-white p-4 shadow'>
          <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
          <div
            className='mx-5 mb-4 mt-12 text-sm leading-loose'
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
          ></div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8  rounded bg-white p-4 shadow'>
          <div className='uppercase text-gray-400'>CÓ THỂ BẠN CŨNG THÍCH</div>
          {productData && (
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {productData.data.data.products.map((product) => (
                <div key={product._id} className='col-span-1'>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
