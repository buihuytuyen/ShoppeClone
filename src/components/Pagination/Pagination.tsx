import UrlPath from '@/constants/path';
import { QueryConfig } from '@/pages/ProductList/ProductList';
import classNames from 'classnames';
import { createSearchParams, Link } from 'react-router-dom';

interface PaginationProps {
  queryConfig: QueryConfig;
  pageSize: number;
}

const RANGE = 2;

export default function Pagination({ queryConfig, pageSize }: PaginationProps) {
  const page = Number(queryConfig.page);

  let dotAfer = false;
  let dotBefore = false;

  const renderDotBefore = (index: number) => {
    if (!dotBefore) {
      dotBefore = true;
      return (
        <span key={index} className=' mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>
          ...
        </span>
      );
    }

    return null;
  };

  const renderDotAfter = (index: number) => {
    if (!dotAfer) {
      dotAfer = true;
      return (
        <span key={index} className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>
          ...
        </span>
      );
    }

    return null;
  };

  const renderPagination = () => {
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1)
          return renderDotAfter(index);
        else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) return renderDotBefore(index);
          else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) return renderDotAfter(index);
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE)
          return renderDotBefore(index);

        return (
          <Link
            to={{
              pathname: `${UrlPath.Home}`,
              search: createSearchParams({
                ...queryConfig,
                page: page.toString()
              }).toString()
            }}
            key={index}
            className={classNames('mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm', {
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        );
      });
  };
  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      {page === 1 ? (
        <span className='mx-2 cursor-not-allowed rounded bg-white/60 px-3 py-2 shadow-sm'>Prev</span>
      ) : (
        <Link
          to={{
            pathname: `${UrlPath.Home}`,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm'
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <span className='mx-2 cursor-not-allowed rounded bg-white/60 px-3 py-2 shadow-sm'>Next</span>
      ) : (
        <Link
          to={{
            pathname: `${UrlPath.Home}`,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm'
        >
          Prev
        </Link>
      )}
    </div>
  );
}
