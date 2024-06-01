import InputNumber, { InputNumberProps } from '@/components/InputNumber';
import classNames from 'classnames';
import { ChangeEvent, useState } from 'react';

interface QuantityControllerProps extends InputNumberProps {
  max?: number;
  disableIncrease?: boolean;
  disableDecrease?: boolean;
  initialValue?: number;
  classNameWrapper?: string;
  onIncrease?: (value: number) => void;
  onDecrease?: (value: number) => void;
  onTyping?: (value: number) => void;
  onFocusOut?: (value: number) => void;
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onTyping,
  onFocusOut,
  value,
  initialValue = 1,
  classNameWrapper,
  disableDecrease,
  disableIncrease,
  ...rest
}: QuantityControllerProps) {
  const [localValue, setLocalValue] = useState<number>(Number(value || initialValue));

  const handleChange = (even: ChangeEvent<HTMLInputElement>) => {
    let _value = Number(even.target.value);
    if (max && _value > max) {
      _value = max;
    } else if (_value < 1) {
      _value = 1;
    }
    if (onTyping) {
      onTyping(_value);
    }
    setLocalValue(_value);
  };

  const increase = () => {
    let _value = Number(value || localValue) + 1;
    if (max && _value > max) {
      _value = max;
    } else if (_value < 1) {
      _value = 1;
    }
    if (onIncrease) {
      onIncrease(_value);
    }
    setLocalValue(_value);
  };

  const decrease = () => {
    let _value = Number(value || localValue) - 1;
    if (max && _value > max) {
      _value = max;
    } else if (_value < 1) {
      _value = 1;
    }
    if (onDecrease) {
      onDecrease(_value);
    }
    setLocalValue(_value);
  };

  const handleFocusOut = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(event.target.value));
  };

  return (
    <div className={classNames('flex items-center', classNameWrapper)}>
      <button
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={decrease}
        disabled={disableDecrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
        </svg>
      </button>
      <InputNumber
        value={value || localValue}
        onChange={handleChange}
        classNameError='hidden'
        classNameInput='h-8 !w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
        onBlur={handleFocusOut}
        {...rest}
      />
      <button
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={increase}
        disabled={disableIncrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  );
}
