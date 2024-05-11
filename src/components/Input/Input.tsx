import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  classNameInput?: string;
  classNameError?: string;
  name?: Path<TFieldValues>;
  register?: UseFormRegister<TFieldValues>;
  rules?: RegisterOptions;
}

export default function Input<TFieldValues extends FieldValues>({
  name,
  register,
  className,
  errorMessage,
  rules,
  type = 'text',
  classNameError,
  classNameInput,
  ...rest
}: Props<TFieldValues>) {
  return (
    <div className={className}>
      <input
        className={classNames(
          'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
          classNameInput
        )}
        type={type}
        {...(register && name ? register(name, rules) : {})}
        {...rest}
      />
      <div className={classNames('mt-1 text-red-600 min-h-[1.25rem] text-sm', classNameError)}>{errorMessage}</div>
    </div>
  );
}
