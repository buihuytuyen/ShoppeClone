import userApi from '@/apis/user.api';
import Button from '@/components/Botton';
import DateSelect from '@/components/DateSelect';
import Input from '@/components/Input';
import InputNumber from '@/components/InputNumber';
import { AppContext } from '@/contexts/app.context';
import { userSchema, UserSchema } from '@/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { saveProfileToLS } from '@/utils/auth';
import { getAvatarUrl, isAxiosUnprocessableEntity } from '@/utils/utils';
import { ErrorReponse } from '@/types/utils.type';
import InputFile from '@/components/InputFile/InputFile';

type FormData = Pick<UserSchema, 'name' | 'date_of_birth' | 'address' | 'phone' | 'avatar'>;
type FromDataError = Omit<FormData, 'date_of_birth'> & { date_of_birth: string };

const profileSchema = userSchema.pick(['name', 'date_of_birth', 'address', 'phone', 'avatar']);

export default function Profile() {
  const [file, setFile] = useState<File>();

  const previewImage = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    watch
  } = useForm<FormData>({
    defaultValues: {
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1),
      name: '',
      phone: ''
    },
    resolver: yupResolver(profileSchema)
  });

  const avatar = watch('avatar');

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  });

  const { setProfile } = useContext(AppContext);

  const profile = profileData?.data.data;

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  });

  const uploadAvatarMutation = useMutation({ mutationFn: userApi.uploadAvatar });

  useEffect(() => {
    if (profile) {
      setValue('address', profile.address);
      setValue('name', profile.name);
      setValue('phone', profile.phone);
      setValue('avatar', profile.avatar);
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1));
    }
  }, [profile, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await uploadAvatarMutation.mutateAsync(formData);
        avatarName = res.data.data;
        setValue('avatar', avatarName);
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      });

      setProfile(res.data.data);
      saveProfileToLS(res.data.data);
      refetch();
      toast.success(res.data.message, { position: 'top-center', autoClose: 2000 });
    } catch (error) {
      if (isAxiosUnprocessableEntity<ErrorReponse<FromDataError>>(error)) {
        const formErorr = error.response?.data.data;
        if (formErorr) {
          Object.entries(formErorr).forEach(([key, value]) => {
            setError(key as keyof FromDataError, {
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
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo vệ tài khoản</div>
      </div>

      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-wrap'>
            <div className='truncate px-4 pt-3 capitalize md:w-[20%] md:px-0 md:text-right'>Email</div>
            <div className='w-[80%] pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>

          <div className='flex flex-col flex-wrap gap-2 md:mt-2 md:flex-row md:gap-0'>
            <div className='truncate px-4 pt-3 capitalize md:w-[20%] md:px-0 md:text-right'>Tên</div>
            <div className='w-[100%] px-4 md:w-[80%] md:px-0 md:pl-5'>
              <Input<FormData>
                classNameInput='px-3 py-2'
                register={register}
                name='name'
                placeholder='Tên'
                errorMessage={errors.name?.message}
                autoComplete='on'
              />
            </div>
          </div>

          <div className='flex flex-col flex-wrap gap-2 md:mt-2 md:flex-row md:gap-0'>
            <div className='truncate px-4 pt-3 capitalize md:w-[20%] md:px-0 md:text-right'>Số điện thoại</div>
            <div className='w-[100%] px-4 md:w-[80%] md:px-0 md:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='px-3 py-2'
                    placeholder='Số điện thoại'
                    errorMessage={errors.phone?.message}
                    {...field}
                    onChange={field.onChange}
                    autoComplete='on'
                  />
                )}
              />
            </div>
          </div>

          <div className='flex flex-col flex-wrap gap-2 md:mt-2 md:flex-row md:gap-0'>
            <div className='truncate px-4 pt-3 capitalize md:w-[20%] md:px-0 md:text-right'>Địa chỉ</div>
            <div className='w-[100%] px-4 md:w-[80%] md:px-0 md:pl-5'>
              <Input<FormData>
                classNameInput='px-3 py-2'
                register={register}
                name='address'
                placeholder='Địa chỉ'
                errorMessage={errors.address?.message}
                autoComplete='on'
              />
            </div>
          </div>

          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_of_birth?.message} onChange={field.onChange} value={field.value} />
            )}
          />

          <div className='flex flex-col flex-wrap gap-2 md:mt-4 md:flex-row md:gap-0'>
            <div className='truncate px-4 pt-3 capitalize md:w-[20%] md:px-0 md:text-right'></div>
            <div className='w-[100%] px-4 md:w-[80%] md:px-0 md:pl-5'>
              <Button
                type='submit'
                className='flex h-9 !w-auto items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>

        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src={previewImage || getAvatarUrl(avatar)}
                alt='Avatar'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <InputFile onChange={setFile} />
            <div className='mt-3 text-gray-400'>
              Dung lượng file tối đa 1MB <br />
              Định dạng:.JPEG, .PNG
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
