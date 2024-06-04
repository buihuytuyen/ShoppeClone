import Config from '@/constants/config';
import { ChangeEvent, MouseEvent, useRef } from 'react';
import { toast } from 'react-toastify';

interface InputFileProps {
  onChange?: (file?: File) => void;
}

export default function InputFile({ onChange }: InputFileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0];
    if (
      fileFromLocal &&
      (fileFromLocal.size >= Config.MAX_SIZE_UPLOAD_AVATAR || !fileFromLocal.type.includes('image'))
    ) {
      toast.error('File không hợp lệ', { position: 'top-center', autoClose: 2000 });
      return;
    } else if (fileFromLocal) onChange && onChange(fileFromLocal);
  };

  const handleChange = (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
    const target = event.target as HTMLInputElement;
    target.value = '';
  };
  return (
    <>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        onChange={onFileChange}
        onClick={handleChange}
        ref={fileInputRef}
      />
      <button
        type='button'
        onClick={handleUpload}
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm hover:bg-black/20'
      >
        Chọn ảnh
      </button>
    </>
  );
}
