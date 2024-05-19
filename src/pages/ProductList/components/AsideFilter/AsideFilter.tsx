import Button from '@/components/Botton';
import Input from '@/components/Input';
import UrlPath from '@/constants/path';
import { QueryConfig } from '@/pages/ProductList/ProductList';
import { Category } from '@/types/category.type';
import classNames from 'classnames';
import { createSearchParams, Link } from 'react-router-dom';

interface AsideFilterProps {
  categories: Category[];
  queryConfig: QueryConfig;
}

export default function AsideFilter({ categories, queryConfig }: AsideFilterProps) {
  const { category } = queryConfig;
  return (
    <div className='py-4'>
      <Link
        to={UrlPath.Home}
        className={classNames('flex items-center font-bold', {
          'font-semibold text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <ul>
        {categories.map((item) => (
          <li className='py-2 pl-2' key={item._id}>
            <Link
              to={{
                pathname: UrlPath.Home,
                search: createSearchParams({
                  ...queryConfig,
                  category: item._id
                }).toString()
              }}
              className={classNames('relative flex items-center px-2', {
                'font-semibold text-orange': category === item._id
              })}
            >
              {category === item._id && (
                <svg viewBox='0 0 4 7' className='absolute left-[-10px] mr-2 h-2 w-2 fill-orange'>
                  <polygon points='4 3.5 0 0 0 7' />
                </svg>
              )}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <Link to={UrlPath.Home} className='mt-4 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        BỘ LỌC TÌM KIẾM
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>

      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2'>
          <div className='flex items-start'>
            <Input className='grow' name='from' placeholder='đ TỪ' classNameInput='p-1' />
            <div className='mx-2 mt-2 shrink-0'>—</div>
            <Input className='grow' name='from' placeholder='đ ĐẾN' classNameInput='p-1' />
          </div>
          <Button className='bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>Áp dụng</Button>
        </form>
      </div>

      <div className='my-4 h-[1px] bg-gray-300'></div>

      <div className='text-sm'>Đánh giá</div>
      <ul className='my-3'>
        <li className='py-1 pl-2'>
          <Link to='' className='flex items-center justify-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg key={index} viewBox='0 0 9.5 8' className='mr-1 h-6 w-6'>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>Trở lên</span>
          </Link>
        </li>
      </ul>

      <div className='my-4 h-[1px] bg-gray-300'></div>
      <Button className='bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>Xóa tất cả</Button>
    </div>
  );
}
