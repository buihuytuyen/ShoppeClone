import classNames from 'classnames';
import { range } from 'lodash';
import { useEffect, useState } from 'react';

interface DateSelectProps {
  classNameError?: string;
  errorMessage?: string;
  onChange?: (value: Date) => void;
  value?: Date;
}

interface DateStateLocal {
  date: number;
  month: number;
  year: number;
}

export default function DateSelect({ classNameError, errorMessage, onChange, value }: DateSelectProps) {
  const [date, setDate] = useState<DateStateLocal>({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  });

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      });
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value: valueFromSelect } = event.target;
    const newDate: DateStateLocal = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    };
    setDate(newDate);
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date));
  };

  return (
    <div className='flex flex-col flex-wrap gap-2 md:mt-2 md:flex-row md:gap-0'>
      <div className='truncate px-4 pt-3 capitalize md:w-[20%] md:px-0 md:text-right'>Ngày sinh</div>
      <div className='w-[100%]px-4 md:w-[80%] md:px-0 md:pl-5 '>
        <div className='flex justify-between'>
          <select
            onChange={handleChange}
            value={value?.getDate() || date.date}
            name='date'
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange focus:border-orange focus-visible:border-orange'
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            value={value?.getMonth() || date.month}
            name='month'
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange focus:border-orange focus-visible:border-orange'
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option key={item} value={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            value={value?.getFullYear() || date.year}
            name='year'
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange focus:border-orange focus-visible:border-orange'
          >
            <option disabled>Năm</option>
            {range(2024, 1910).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={classNames('mt-1 min-h-[1.25rem] text-sm text-red-600', classNameError)}>{errorMessage}</div>
      </div>
    </div>
  );
}
