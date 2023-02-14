import Head from 'next/head';
import { ReactNode } from 'react';

type PageWrapperProps = { children: ReactNode; title?: string };

export function PageWrapper({
  children,
  title = 'Spotify Trending Artists App',
}: PageWrapperProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className='h-screen bg-gray-900'>{children}</section>
    </>
  );
}
