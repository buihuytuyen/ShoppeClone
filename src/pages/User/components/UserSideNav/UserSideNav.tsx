import UrlPath from '@/constants/path';
import { Link } from 'react-router-dom';

export default function UserSideNav() {
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link
          to={UrlPath.Profile}
          className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'
        >
          <img
            src='https://scontent.fhan5-6.fna.fbcdn.net/v/t39.30808-1/404516795_2073979862985461_1550205334901129295_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGGXGUM6KgZG6kmlGEL2-UZOED6s6nMS1w4QPqzqcxLXOxqLwIox4tGR2KdWC4lSZ-Yjg6lpvEAhk05nJcWc49k&_nc_ohc=l1KtSE6QTAwQ7kNvgHyDSNN&_nc_ht=scontent.fhan5-6.fna&oh=00_AYCkBadYKn8koZ-5MbSfC5LTcwtB-_WCJnW683JObjKkDw&oe=6660C792'
            alt="User's avatar"
            className='h-full w-full object-cover'
          />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>cdThanh</div>
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
            <img
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              className='h-full w-full'
              alt='icon'
            />
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
