import categoryApi from '@/apis/category.apt';
import productApi from '@/apis/product.api';
import Pagination from '@/components/Pagination';
import useQueryParams from '@/hooks/useQueryParams';
import AsideFilter from '@/pages/ProductList/components/AsideFilter';
import Product from '@/pages/ProductList/components/Product';
import SortProductList from '@/pages/ProductList/components/SortProductList';
import { ProductListConfig } from '@/types/product.type';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { isUndefined, omitBy } from 'lodash';

export type QueryConfig = {
  [key in keyof ProductListConfig]: string;
};

export default function ProductList() {
  const queryParam = useQueryParams();

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParam.page || '1',
      limit: queryParam.limit || '20',
      sort_by: queryParam.sort_by,
      exclude: queryParam.exclude,
      name: queryParam.name,
      order: queryParam.order,
      price_max: queryParam.price_max,
      price_min: queryParam.price_min,
      rating_filter: queryParam.rating_filter,
      category: queryParam.category
    },
    isUndefined
  );

  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData
  });

  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories()
  });

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productData && (
          <div className='grid grid-cols-12 gap-16'>
            <div className='col-span-3'>
              <AsideFilter categories={categoryData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productData.data.data.products.map((product) => (
                  <div key={product._id} className='col-span-1'>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
