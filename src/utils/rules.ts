import { FormData } from '@/pages/Register/Register';
import { RegisterOptions, UseFormGetValues } from 'react-hook-form';

export type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions;
};

export const getRules = (getValues?: UseFormGetValues<FormData>): Rules => ({
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
