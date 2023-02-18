type ErrorMessageProps = {
  text: string;
};

export function ErrorMessage({ text }: ErrorMessageProps) {
  return (
    <div
      className='rounded-lg bg-gray-800 p-1 text-center text-sm text-red-400'
      role='alert'
    >
      <span className='text-base font-medium'>{text}</span>
    </div>
  );
}
