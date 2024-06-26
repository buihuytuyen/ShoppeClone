import categoryApi from '@/apis/category.apt';
import productApi from '@/apis/product.api';
import Pagination from '@/components/Pagination';
import useQueryConfig from '@/hooks/useQueryConfig';
import AsideFilter from '@/pages/ProductList/components/AsideFilter';
import Product from '@/pages/ProductList/components/Product';
import SortProductList from '@/pages/ProductList/components/SortProductList';
import { ProductListConfig } from '@/types/product.type';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function ProductList() {
  const queryConfig = useQueryConfig();

  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 3
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
