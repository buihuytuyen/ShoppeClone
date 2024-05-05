import { login } from '@/apis/auth.api';
import Input from '@/components/Input';
import { ReponseApi } from '@/types/utils.type';
import { loginShemaValidation, LoginShemaValidation } from '@/utils/rules';
import { isAxiosUnprocessableEntity } from '@/utils/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginShemaValidation>({
    resolver: yupResolver(loginShemaValidation)
  });

  const loginMutation = useMutation({
    mutationFn: (body: LoginShemaValidation) => login(body)
  });

  const onsubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ReponseApi<LoginShemaValidation>>(error)) {
          const formErorr = error.response?.data.data;
          if (formErorr) {
            Object.entries(formErorr).forEach(([key, value]) => {
              setError(key as keyof LoginShemaValidation, {
                message: value,
                type: 'Server'
              });
            });
          }
        }
      }
    });
  });

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' noValidate onSubmit={onsubmit}>
              <div className='text=2xl'>Đăng nhập</div>
              <Input<LoginShemaValidation>
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input<LoginShemaValidation>
                name='password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on'
              />
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm rounded-sm hover:bg-red-600'
                >
                  Đăng nhập
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn mới biết đến Shopee?</span>
                <Link to='/register' className='text-red-500 ml-1'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
