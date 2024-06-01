import classNames from 'classnames';
import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from 'react';

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  classNameInput?: string;
  classNameError?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
  {
    className,
    errorMessage,
    type = 'text',
    classNameError,
    classNameInput,
    onChange,
    value = '',
    ...rest
  }: InputNumberProps,
  ref
) {
  const [localValue, setlocalValue] = useState<string>(String(value));

  const handleChange = (even: ChangeEvent<HTMLInputElement>) => {
    const { value } = even.target;
    if (/^\d+$/.test(value) || value === '') {
      if (onChange) {
        onChange(even);
      }
      setlocalValue(value);
    }
  };
  const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    event.target.select();
  };

  return (
    <div className={className}>
      <input
        className={classNames(
          'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
          classNameInput
        )}
        type={type}
        value={value || localValue}
        {...rest}
        onChange={handleChange}
        onFocus={handleFocus}
        ref={ref}
      />
      <div className={classNames('mt-1 min-h-[1.25rem] text-sm text-red-600', classNameError)}>{errorMessage}</div>
    </div>
  );
});

export default InputNumber;
