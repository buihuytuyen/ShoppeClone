import ProductRating from '@/components/ProductRating';
import Routes from '@/constants/path';
import { Product as ProductType } from '@/types/product.type';
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from '@/utils/utils';
import { Link } from 'react-router-dom';

interface ProductProps {
  product: ProductType;
}
export default function Product({ product }: ProductProps) {
  return (
    <Link to={`${Routes.Home}${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-200 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute left-0 top-0 h-full w-full bg-white object-cover'
          />
        </div>

        <div className='overflow-hidden p-2'>
          <div className='line-clamp-2 min-h-[2rem] text-xs' title={product.name}>
            {product.name}
          </div>
          <div className='mt-3 flex items-center text-sm'>
            <div className='truncate text-orange' title={`đ${formatCurrency(product.price)}`}>
              <span className='text-xs'>₫</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
            <div
              className='ml-1 max-w-[50%] truncate text-gray-500 line-through'
              title={`₫${formatCurrency(product.price_before_discount)}`}
            >
              <span className='text-xs'>₫</span>
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
