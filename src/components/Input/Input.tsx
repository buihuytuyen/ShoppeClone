import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from 'react';
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props<TFieldValues extends FieldValues> {
  type: HTMLInputTypeAttribute;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  rules?: RegisterOptions;
  autoComplete?: HTMLInputAutoCompleteAttribute;
}

export default function Input<TFieldValues extends FieldValues>({
  name,
  register,
  type,
  className,
  errorMessage,
  placeholder,
  rules,
  autoComplete
}: Props<TFieldValues>) {
  return (
    <div className={className}>
      <input
        type={type}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        placeholder={placeholder}
        {...register(name, rules)}
        autoComplete={autoComplete}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  );
}
