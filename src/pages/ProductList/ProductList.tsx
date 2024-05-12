import productApi from '@/apis/product.api';
import Pagination from '@/components/Pagination';
import useQueryParams from '@/hooks/useQueryParams';
import AsideFilter from '@/pages/ProductList/components/AsideFilter';
import Product from '@/pages/ProductList/components/Product';
import SortProductList from '@/pages/ProductList/components/SortProductList';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function ProductList() {
  const queryParam = useQueryParams();
  const [page, setpage] = useState<number>(1);
  const { data } = useQuery({
    queryKey: ['products', queryParam],
    queryFn: () => productApi.getProducts(queryParam)
  });

  console.log(data);

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-16'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {data &&
                data.data.data.products.map((product) => (
                  <div key={product._id} className='col-span-1'>
                    <Product product={product} />
                  </div>
                ))}
            </div>
            <Pagination page={page} setPage={setpage} pageSize={7} />
          </div>
        </div>
      </div>
    </div>
  );
}
