import Button from '@/components/Botton';
import InputNumber from '@/components/InputNumber';
import InputV2 from '@/components/InputV2';
import UrlPath from '@/constants/path';
import { QueryConfig } from '@/hooks/useQueryConfig';
import RatingStars from '@/pages/RatingStarS';
import { Category } from '@/types/category.type';
import { NoUndefinedField } from '@/types/utils.type';
import { FilterSchemaValidation, filterSchemaValidation } from '@/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { omit } from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { ObjectSchema } from 'yup';

interface AsideFilterProps {
  categories: Category[];
  queryConfig: QueryConfig;
}

type FormData = NoUndefinedField<FilterSchemaValidation>;

export default function AsideFilter({ categories, queryConfig }: AsideFilterProps) {
  const { category } = queryConfig;

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver<FormData>(filterSchemaValidation as ObjectSchema<FormData>),
    shouldFocusError: false
  });
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: UrlPath.Home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    });
  });

  const handleRemoveAll = () => {
    navigate({
      pathname: UrlPath.Home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig
          },
          ['price_max', 'rating_filter', 'price_min', 'category']
        )
      ).toString()
    });
  };

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
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field: { onChange, value, ref } }) => (
                <InputNumber
                  className='grow'
                  name='from'
                  placeholder='đ TỪ'
                  classNameInput='p-1'
                  classNameError='hidden'
                  onChange={onChange}
                  value={value}
                  ref={ref}
                />
              )}
            />

            <div className='mx-2 mt-2 shrink-0'>—</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field: { onChange, value, ref } }) => (
                <InputNumber
                  className='grow'
                  name='to'
                  placeholder='đ ĐẾN'
                  classNameInput='p-1'
                  classNameError='hidden'
                  onChange={(e) => {
                    onChange(e);
                    trigger('price_min');
                  }}
                  value={value}
                  ref={ref}
                />
              )}
            />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
          <Button className='bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>Áp dụng</Button>
        </form>
      </div>

      <div className='my-4 h-[1px] bg-gray-300'></div>

      <div className='text-sm'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />

      <div className='my-4 h-[1px] bg-gray-300'></div>
      <Button
        className='bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
        onClick={() => handleRemoveAll()}
      >
        Xóa tất cả
      </Button>
    </div>
  );
}
