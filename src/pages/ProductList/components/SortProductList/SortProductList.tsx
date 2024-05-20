import UrlPath from '@/constants/path';
import { SortBy, Order } from '@/constants/product';
import { QueryConfig } from '@/hooks/useQueryConfig';
import { ProductListConfig } from '@/types/product.type';
import classNames from 'classnames';
import { omit } from 'lodash';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';

interface SortProductListProps {
  queryConfig: QueryConfig;
  pageSize: number;
}

export default function SortProductList({ queryConfig, pageSize }: SortProductListProps) {
  const { sort_by = SortBy.CreatedAt, order } = queryConfig;
  const page = Number(queryConfig.page) || 1;

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue;
  };

  const navigate = useNavigate();

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: `${UrlPath.Home}`,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    });
  };

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: `${UrlPath.Home}`,
      search: createSearchParams({
        ...queryConfig,
        sort_by: SortBy.Price,
        order: orderValue
      }).toString()
    });
  };

  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            onClick={() => handleSort(SortBy.View)}
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(SortBy.View),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(SortBy.View)
            })}
          >
            Phổ biến
          </button>
          <button
            onClick={() => handleSort(SortBy.CreatedAt)}
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(SortBy.CreatedAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(SortBy.CreatedAt)
            })}
          >
            Mới nhất
          </button>
          <button
            onClick={() => handleSort(SortBy.Sold)}
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(SortBy.Sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(SortBy.Sold)
            })}
          >
            Bán chạy
          </button>
          <select
            className={classNames('h-8 px-4 text-left text-sm capitalize outline-none', {
              'bg-white text-black  hover:bg-slate-100': !isActiveSortBy(SortBy.Price),
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(SortBy.Price)
            })}
            value={order || ''}
            onChange={(e) => handlePriceOrder(e.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={Order.Asc} className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={Order.Desc} className='bg-white text-black'>
              Giá: Cao đến Thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {page === 1 ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: `${UrlPath.Home}`,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-bl-sm rounded-tl-sm bg-white shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}

            {page === pageSize ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: `${UrlPath.Home}`,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-bl-sm rounded-tl-sm bg-white shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
