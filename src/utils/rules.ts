import { Path, RegisterOptions, UseFormGetValues } from 'react-hook-form';
import * as yup from 'yup';

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
    .oneOf([yup.ref('password')], 'Confirm password không khớp')
});

export type SchemaValidation = yup.InferType<typeof schemaValidation>;

export const loginShemaValidation = schemaValidation.pick(['email', 'password']);
export type LoginShemaValidation = yup.InferType<typeof loginShemaValidation>;

export const registerShemaValidation = schemaValidation.pick(['email', 'password', 'confirm_password']);
export type RegisterShemaValidation = yup.InferType<typeof registerShemaValidation>;

export type Rules = {
  [key in Path<RegisterShemaValidation>]?: RegisterOptions;
};

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
