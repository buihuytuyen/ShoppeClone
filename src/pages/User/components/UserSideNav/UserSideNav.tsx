import UrlPath from '@/constants/path';
import { AppContext } from '@/contexts/app.context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAvatarUrl } from '@/utils/utils';

export default function UserSideNav() {
  const { profile } = useContext(AppContext);
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link
          to={UrlPath.Profile}
          className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'
        >
          <img src={getAvatarUrl(profile?.avatar)} alt="User's avatar" className='h-full w-full object-cover' />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>{profile?.name}</div>
          <Link to={UrlPath.Profile} className='flex items-center capitalize text-gray-500'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <Link to={UrlPath.Profile} className='text-gray-60 flex items-center capitalize transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              className='h-full w-full'
              alt='icon'
            />
          </div>
          Tài khoản của tôi
        </Link>
        <Link to={UrlPath.ChangePassword} className='text-gray-60 mt-2 flex items-center capitalize transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-full w-full stroke-blue-700'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z'
              />
            </svg>
          </div>
          Đổi mật khẩu
        </Link>
        <Link to={UrlPath.HistoryPurchase} className='text-gray-60 mt-2 flex items-center capitalize transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078' alt='icon' />
          </div>
          Đơn mua
        </Link>
      </div>
    </div>
  );
}
