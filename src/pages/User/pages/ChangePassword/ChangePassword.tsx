import userApi from '@/apis/user.api';
import Button from '@/components/Botton';
import Input from '@/components/Input';
import { ErrorReponse } from '@/types/utils.type';
import { userSchema, UserSchema } from '@/utils/rules';
import { isAxiosUnprocessableEntityError } from '@/utils/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import omit from 'lodash/omit';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>;

const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password']);

export default function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  });

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']));
      toast.success(res.data.message);
      reset();
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorReponse<FormData>>(error)) {
        const formErorr = error.response?.data.data;
        if (formErorr) {
          Object.entries(formErorr).forEach(([key, value]) => {
            setError(key as keyof FormData, {
              message: value,
              type: 'Server'
            });
          });
        }
      }
    }
  });

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Quản lý mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Thay đổi mật khẩu để bảo vệ tài khoản</div>
      </div>

      <form className='mr-auto mt-8 max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap gap-2 md:mt-2 md:flex-row md:gap-0'>
            <div className='truncate px-4 pt-3 capitalize md:w-[30%] md:px-0 md:text-right'>Mật khẩu hiện tại</div>
            <div className='w-[100%] px-4 md:w-[70%] md:px-0 md:pl-5'>
              <Input<FormData>
                classNameInput='px-3 py-2'
                register={register}
                name='password'
                placeholder='Mật khẩu hiện tại'
                errorMessage={errors.password?.message}
                autoComplete='on'
                type='password'
              />
            </div>
          </div>

          <div className='flex flex-col flex-wrap gap-2 md:mt-2 md:flex-row md:gap-0'>
            <div className='truncate px-4 pt-3 capitalize md:w-[30%] md:px-0 md:text-right'>Mật khẩu mới</div>
            <div className='w-[100%] px-4 md:w-[70%] md:px-0 md:pl-5'>
              <Input<FormData>
                classNameInput='px-3 py-2'
                register={register}
                name='new_password'
                placeholder='Mật khẩu mới'
                errorMessage={errors.new_password?.message}
                autoComplete='on'
                type='password'
              />
            </div>
          </div>

          <div className='flex flex-col flex-wrap gap-2 md:mt-2 md:flex-row md:gap-0'>
            <div className='truncate px-4 pt-3 capitalize md:w-[30%] md:px-0 md:text-right'>Xác nhận mật khẩu mới</div>
            <div className='w-[100%] px-4 md:w-[70%] md:px-0 md:pl-5'>
              <Input<FormData>
                classNameInput='px-3 py-2'
                register={register}
                name='confirm_password'
                placeholder='Xác nhận mật khẩu mới'
                errorMessage={errors.confirm_password?.message}
                autoComplete='on'
                type='password'
              />
            </div>
          </div>

          <div className='flex flex-col flex-wrap gap-2 md:mt-4 md:flex-row md:gap-0'>
            <div className='truncate px-4 pt-3 capitalize md:w-[30%] md:px-0 md:text-right'></div>
            <div className='w-[100%] px-4 md:w-[70%] md:px-0 md:pl-5'>
              <Button
                type='submit'
                className='flex h-9 !w-auto items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
              >
                Đổi mật khẩu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
