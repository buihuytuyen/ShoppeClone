import Input from '@/components/Input';

export default function Profile() {
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo vệ tài khoản</div>
      </div>

      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <form className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-wrap'>
            <div className='truncate px-4 pt-3 capitalize md:w-[20%] md:px-0 md:text-right'>Email</div>
            <div className='w-[80%] pl-5'>
              <div className='pt-3 text-gray-700'>bui*****@gmail.com</div>
            </div>
          </div>

          <div className='flex flex-col flex-wrap gap-2 md:mt-2 md:flex-row md:gap-0'>
            <div className='truncate px-4 pt-3 capitalize md:w-[20%] md:px-0 md:text-right'>Tên</div>
            <div className='w-[100%] px-4 md:w-[80%] md:px-0 md:pl-5'>
              <Input classNameInput='px-3 py-2' />
            </div>
          </div>

          <div className='flex flex-col flex-wrap gap-2 md:mt-2 md:flex-row md:gap-0'>
            <div className='truncate px-4 pt-3 capitalize md:w-[20%] md:px-0 md:text-right'>Số điện thoại</div>
            <div className='w-[100%] px-4 md:w-[80%] md:px-0 md:pl-5'>
              <Input classNameInput='px-3 py-2' />
            </div>
          </div>

          <div className='flex flex-col flex-wrap gap-2 md:mt-2 md:flex-row md:gap-0'>
            <div className='truncate px-4 pt-3 capitalize md:w-[20%] md:px-0 md:text-right'>Địa chỉ</div>
            <div className='w-[100%] px-4 md:w-[80%] md:px-0 md:pl-5'>
              <Input classNameInput='px-3 py-2' />
            </div>
          </div>

          <div className='flex flex-col flex-wrap gap-2 md:mt-2 md:flex-row md:gap-0'>
            <div className='truncate px-4 pt-3 capitalize md:w-[20%] md:px-0 md:text-right'>Ngày sinh</div>
            <div className='flex w-[100%] justify-between px-4 md:w-[80%] md:px-0 md:pl-5 '>
              <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                <option disabled>Ngày</option>
              </select>
              <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                <option disabled>Tháng</option>
              </select>
              <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                <option disabled>Năm</option>
              </select>
            </div>
          </div>
        </form>

        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src='https://scontent.fhan5-6.fna.fbcdn.net/v/t39.30808-1/404516795_2073979862985461_1550205334901129295_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGGXGUM6KgZG6kmlGEL2-UZOED6s6nMS1w4QPqzqcxLXOxqLwIox4tGR2KdWC4lSZ-Yjg6lpvEAhk05nJcWc49k&_nc_ohc=l1KtSE6QTAwQ7kNvgHyDSNN&_nc_ht=scontent.fhan5-6.fna&oh=00_AYCkBadYKn8koZ-5MbSfC5LTcwtB-_WCJnW683JObjKkDw&oe=6660C792'
                alt=''
                className='w-full rounded-full object-cover'
              />
            </div>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm hover:bg-black/20'>
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              Dung lượng file tối đa 1MB <br />
              Định dạng:.JPEG, .PNG
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
