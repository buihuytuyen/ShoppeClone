import authApi from '@/apis/auth.api';
import Button from '@/components/Botton';
import Input from '@/components/Input';
import UrlPath from '@/constants/path';
import { AppContext } from '@/contexts/app.context';
import { ErrorReponse } from '@/types/utils.type';
import { LoginShemaValidation, registerShemaValidation, RegisterShemaValidation } from '@/utils/rules';
import { isAxiosUnprocessableEntity } from '@/utils/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { omit } from 'lodash';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterShemaValidation>({
    resolver: yupResolver(registerShemaValidation)
  });
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navagate = useNavigate();

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<RegisterShemaValidation, 'confirm_password'>) => authApi.registerAccount(body)
  });

  const onsubmit = handleSubmit((data) => {
    const body = omit(data, 'confirm_password');
    registerAccountMutation.mutate(body, {
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
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' noValidate onSubmit={onsubmit}>
              <div className='text=2xl'>Đăng ký</div>
              <Input<RegisterShemaValidation>
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input<RegisterShemaValidation>
                name='password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on'
              />
              <Input<RegisterShemaValidation>
                name='confirm_password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password'
                autoComplete='on'
              />

              <div className='mt-3'>
                <Button
                  isLoading={registerAccountMutation.isPending}
                  type='submit'
                  className='w-full rounded-sm bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng ký
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link to={UrlPath.Login} className='ml-1 text-red-500'>
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
