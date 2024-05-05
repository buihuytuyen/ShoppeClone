import Input from '@/components/Input';
import { getRules } from '@/utils/rules';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
export interface FormData {
  email: string;
  password: string;
  confirm_password: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<FormData>();

  const rules = getRules(getValues);

  const onsubmit = handleSubmit(
    (data) => {
      console.log(data);
    },
    (data) => {}
  );

  // const password = watch('password');
  // console.log(password);

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' noValidate onSubmit={onsubmit}>
              <div className='text=2xl'>Đăng ký</div>
              <Input<FormData>
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
                rules={rules.email}
              />
              <Input<FormData>
                name='password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.password?.message}
                placeholder='Password'
                rules={rules.password}
                autoComplete='on'
              />

              <Input<FormData>
                name='confirm_password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password'
                rules={rules.confirm_password}
                autoComplete='on'
              />

              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm rounded-sm hover:bg-red-600'
                >
                  Đăng ký
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link to='/login' className='text-red-500 ml-1'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
