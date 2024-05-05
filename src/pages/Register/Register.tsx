import { registerAccount } from '@/apis/auth.api';
import Input from '@/components/Input';
import { ReponseApi } from '@/types/utils.type';
import { LoginShemaValidation, RegisterShemaValidation, schemaValidation } from '@/utils/rules';
import { isAxiosUnprocessableEntity } from '@/utils/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { omit } from 'lodash';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterShemaValidation>({
    resolver: yupResolver(schemaValidation)
  });

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<RegisterShemaValidation, 'confirm_password'>) => registerAccount(body)
  });

  const onsubmit = handleSubmit((data) => {
    const body = omit(data, 'confirm_password');
    registerAccountMutation.mutate(body, {
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
