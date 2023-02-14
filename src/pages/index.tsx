import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ErrorMessage } from '@/components/ErrorMessage';
import { FormInput } from '@/components/FormInput';
import { PageWrapper } from '@/components/PageWrapper';

import { emailSchema, passwordSchema } from '@/utils/schemas';

import { AuthFormValues } from '@/types/auth';

const signInSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [informationMessage, setInformationMessage] = useState('');
  const [formProcessing, setFormProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const signUpInfo = router.query?.signupSuccess || '';
    if (signUpInfo === 'true') {
      setInformationMessage(
        'Your account has been created. You can sign in now.'
      );
      const timer = setTimeout(() => {
        setInformationMessage('');
        clearTimeout(timer);
      }, 5000);
    }
  }, []);

  const onSubmit = async ({ email, password }: AuthFormValues) => {
    setFormProcessing(true);
    if (errorMessage.length > 0) setErrorMessage('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        router.push('/dashboard');
      } else {
        throw new Error(
          result?.error ||
            'Oops! An unexpected problem occurred, please try again later.'
        );
      }
    } catch (err) {
      setErrorMessage((err as Error).message);
    } finally {
      setFormProcessing(false);
    }
  };

  return (
    <PageWrapper title='Sign in - Spotify Trending Artists App'>
      <div className='mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <h1 className='mb-16 text-3xl font-semibold text-gray-900 dark:text-white'>
          Spotify trending artists
        </h1>
        <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
          <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <h2 className='text-xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
              Sign in to your account
            </h2>
            <form
              className='space-y-4 md:space-y-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormInput
                id='email'
                type='email'
                register={register}
                label='Your email'
                placeholder='name@company.com'
                error={errors?.email?.message || ''}
              />
              <FormInput
                id='password'
                type='password'
                register={register}
                label='Password'
                placeholder='••••••••'
                error={errors?.password?.message || ''}
              />
              <button
                type='submit'
                disabled={formProcessing}
                className='w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-300 hover:bg-primary-700 dark:bg-primary-600 dark:focus:ring-primary-800 dark:hover:bg-primary-700'
              >
                {formProcessing ? 'Loading...' : 'Sign in'}
              </button>
              {informationMessage.length > 0 ? (
                <div
                  className='rounded-lg bg-gray-800 p-1 text-center text-sm text-green-400'
                  role='alert'
                >
                  <span className='text-sm font-medium'>
                    {informationMessage}
                  </span>
                </div>
              ) : null}
              {errorMessage.length > 0 ? (
                <ErrorMessage text={errorMessage} />
              ) : null}
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet?{' '}
                <Link
                  href='/signup'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
