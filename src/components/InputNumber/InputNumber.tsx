import classNames from 'classnames';
import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  classNameInput?: string;
  classNameError?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumber(
  { className, errorMessage, type = 'text', classNameError, classNameInput, onChange, ...rest }: Props,
  ref
) {
  const handleChange = (even: ChangeEvent<HTMLInputElement>) => {
    const { value } = even.target;
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(even);
    }
  };

  return (
    <div className={className}>
      <input
        className={classNames(
          'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
          classNameInput
        )}
        type={type}
        {...rest}
        onChange={handleChange}
        ref={ref}
      />
      <div className={classNames('mt-1 min-h-[1.25rem] text-sm text-red-600', classNameError)}>{errorMessage}</div>
    </div>
  );
});

export default InputNumber;
