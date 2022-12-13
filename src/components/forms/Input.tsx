import React from 'react';
import { useFormContext } from 'react-hook-form';

type InputProps = {
  label?: string;
  name: string;
  type?: string;
  required?: boolean;
  value?: string;
  classNames?: string,
};

const Input: React.FC<InputProps> = ({ label, name, type = 'text', required = false, value, classNames = "col-span-1" }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();``

  return (
    <div className={classNames}>
      { type !== 'hidden' ? (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      ) : <></> }
      <input
        type={type}
        placeholder=' '
        required={required}
        value={value}
        className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm'
        {...register(name)}
      />
      {errors[name] && (
        <span className='text-red-500 text-xs pt-1 block'>
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default Input;
