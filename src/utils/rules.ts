import { Path, RegisterOptions, UseFormGetValues } from 'react-hook-form';
import * as yup from 'yup';

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string };
  if (price_min !== '' && price_max !== '') return Number(price_min) <= Number(price_max);
  return price_max !== '' || price_min !== '';
}

export const schemaValidation = yup.object({
  email: yup
    .string()
    .required('Email không được để trống')
    .email('Email không hợp lệ')
    .min(5, 'Email phải dài hơn 5 ký tự')
    .max(160, 'Email phải ngắn hơn 160 ký tự'),
  password: yup
    .string()
    .required('Password không được để trống')
    .min(6, 'Password phải dài hơn 6 ký tự')
    .max(160, 'Password phải ngắn hơn 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Confirm password không được để trống')
    .min(6, 'Confirm password phải dài hơn 6 ký tự')
    .max(160, 'Confirm password phải ngắn hơn 160 ký tự')
    .oneOf([yup.ref('password')], 'Confirm password không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không hợp lệ',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không hợp lệ',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Tên sản phẩm không được để trống')
});

export type SchemaValidation = yup.InferType<typeof schemaValidation>;

export const loginShemaValidation = schemaValidation.pick(['email', 'password']);
export type LoginShemaValidation = yup.InferType<typeof loginShemaValidation>;

export const registerShemaValidation = schemaValidation.pick(['email', 'password', 'confirm_password']);
export type RegisterShemaValidation = yup.InferType<typeof registerShemaValidation>;

export type Rules = {
  [key in Path<RegisterShemaValidation>]?: RegisterOptions;
};

export const filterSchemaValidation = schemaValidation.pick(['price_min', 'price_max']);
export type FilterSchemaValidation = yup.InferType<typeof filterSchemaValidation>;

export const productSchemaValidation = schemaValidation.pick(['name']);
export type ProductSchemaValidation = yup.InferType<typeof productSchemaValidation>;

export const getRules = (getValues?: UseFormGetValues<RegisterShemaValidation>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email không được để trống'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không hợp lệ'
    },
    minLength: {
      value: 5,
      message: 'Email phải dài hơn 5 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Email phải ngắn hơn 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password không được để trống'
    },
    minLength: {
      value: 6,
      message: 'Password phải dài hơn 6 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Password phải ngắn hơn 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm password không được để trống'
    },
    minLength: {
      value: 6,
      message: 'Confirm password phải dài hơn 6 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Confirm password phải ngắn hơn 160 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Confirm password không khớp'
        : undefined
  }
});

export const userSchema = yup.object({
  name: yup.string().max(160, 'Tên phải ngắn hơn 160 ký tự'),
  phone: yup.string().max(20, 'Số điện thoại phải ngắn hơn 20 ký tự'),
  address: yup.string().max(160, 'Địa chỉ phải ngắn hơn 160 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Ngày sinh không hợp lệ'),
  password: schemaValidation.fields.password,
  new_password: schemaValidation.fields.password,
  confirm_password: schemaValidation.fields.confirm_password,
  avatar: yup.string().max(1000, 'Avatar phải ngắn hơn 1000 ký tự')
});

export type UserSchema = yup.InferType<typeof userSchema>;
