import classNames from 'classnames';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

export type InputNumberProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> &
  InputHTMLAttributes<HTMLInputElement> & {
    classNameInput?: string;
    classNameError?: string;
  };

const InputV2 = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: InputNumberProps<TFieldValues, TName>
) => {
  const { className, type = 'text', classNameError, classNameInput, onChange, value = '', ...rest } = props;

  const { field, fieldState } = useController(props);

  const [localValue, setlocalValue] = useState<string>(String(field.value));

  const handleChange = (even: ChangeEvent<HTMLInputElement>) => {
    const valueForm = even.target.value;
    const numberCondition = type === 'number' && (/^\d+$/.test(valueForm) || valueForm === '');
    if (numberCondition || type !== 'number') {
      setlocalValue(valueForm);

      field.onChange(even);

      if (onChange) {
        onChange(even);
      }
    }
  };

  return (
    <div className={className}>
      <input
        {...rest}
        {...field}
        className={classNames(
          'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
          classNameInput
        )}
        value={value || localValue}
        onChange={handleChange}
      />
      <div className={classNames('mt-1 min-h-[1.25rem] text-sm text-red-600', classNameError)}>
        {fieldState.error?.message}
      </div>
    </div>
  );
};
export default InputV2;
