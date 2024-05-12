import ProductRating from '@/components/ProductRating';
import { Product as ProductType } from '@/types/product.type';
import { formatCurrency, formatNumberToSocialStyle } from '@/utils/utils';
import { Link } from 'react-router-dom';

interface ProductProps {
  product: ProductType;
}
export default function Product({ product }: ProductProps) {
  return (
    <Link to=''>
      <div className='bg-white shadow rounded-sm overflow-hidden hover:translate-y-[-0.04rem] hover:shadow-md duration-200 transition-transform'>
        <div className='w-full pt-[100%] relative'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>

        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs' title={product.name}>
            {product.name}
          </div>
          <div className='flex items-center mt-3'>
            <div className='text-orange truncate' title={`đ${formatCurrency(product.price)}`}>
              <span className='text-xs'>đ</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
            <div
              className='line-through max-w-[50%] text-gray-500 truncate ml-1'
              title={`đ${formatCurrency(product.price_before_discount)}`}
            >
              <span className='text-xs'>đ</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating} />

            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
