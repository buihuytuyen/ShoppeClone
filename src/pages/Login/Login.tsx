import authApi from '@/apis/auth.api';
import Button from '@/components/Botton';
import Input from '@/components/Input';
import UrlPath from '@/constants/path';
import { AppContext } from '@/contexts/app.context';
import { ErrorReponse } from '@/types/utils.type';
import { loginShemaValidation, LoginShemaValidation } from '@/utils/rules';
import { isAxiosUnprocessableEntity } from '@/utils/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginShemaValidation>({
    resolver: yupResolver(loginShemaValidation)
  });

  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navagate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (body: LoginShemaValidation) => authApi.login(body)
  });

  const onsubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setProfile(data.data.data.user);
        navagate('/');
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorReponse<LoginShemaValidation>>(error)) {
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
                <Button
                  isLoading={loginMutation.isPending}
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm rounded-sm hover:bg-red-600'
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn mới biết đến Shopee?</span>
                <Link to={UrlPath.Register} className='text-red-500 ml-1'>
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
