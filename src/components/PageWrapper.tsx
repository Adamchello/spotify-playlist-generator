import Head from 'next/head';
import { ReactNode } from 'react';

type PageWrapperProps = { children: ReactNode; title?: string };

export function PageWrapper({
  children,
  title = 'Spotify Playlist Generator App',
}: PageWrapperProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          property='description'
          content="The Spotify playlist generator app that creates random playlist based on
          user's selected genre."
        />
        <meta property='og:type' content='website' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <section className='h-screen bg-gray-900'>{children}</section>
    </>
  );
}
