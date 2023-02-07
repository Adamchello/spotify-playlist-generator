import { UseFormRegister } from 'react-hook-form';

type FormInputProps = {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  error: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
};

export function FormInput({
  id,
  label,
  placeholder,
  type = 'text',
  error,
  register,
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
        placeholder={placeholder}
        {...register(id)}
      />
      {error.length > 0 ? <p className='my-2 text-red-500'>{error}</p> : null}
    </div>
  );
}
