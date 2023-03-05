type SelectProps = {
  value: string;
  setValue: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
};

export function Select({ value, setValue, options, placeholder }: SelectProps) {
  return (
    <div className='mt-8 w-full max-w-xs'>
      <label
        htmlFor='genres'
        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
      >
        Select an option
      </label>
      <select
        id='genres'
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <option value=''>{placeholder}</option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
