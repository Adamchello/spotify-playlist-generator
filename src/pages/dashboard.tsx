import Image from 'next/image';

import { HeartSVG, OptionDotsSVG, UserSVG } from '@/components/Icons';
import { PageWrapper } from '@/components/PageWrapper';

const songsList = [
  {
    id: '17K0z0mxfAuYNNrV8Jx8v1',
    image: 'https://i.scdn.co/image/ab67616d00004851c722ea8432740afca6ecb290',
    name: 'Song name',
    author: 'Author name',
    duration: '03:29',
    playsNumber: '8 078 651',
  },
  {
    id: '17K0z0mxfAuYNNrV8Jx8v2',
    image: 'https://i.scdn.co/image/ab67616d00004851c722ea8432740afca6ecb290',
    name: 'Song name',
    author: 'Author name',
    duration: '03:29',
    playsNumber: '8 078 651',
  },
  {
    id: '17K0z0mxfAuYNNrV8Jx8v3',
    image: 'https://i.scdn.co/image/ab67616d00004851c722ea8432740afca6ecb290',
    name: 'Song name',
    author: 'Author name',
    duration: '03:29',
    playsNumber: '8 078 651',
  },
];

export default function Dashboard() {
  return (
    <PageWrapper title='Dashboard - Spotify Trending Artists App'>
      <div className='mx-auto flex h-screen max-w-3xl flex-col items-center justify-center px-6 py-8 lg:py-0'>
        <button className='rounded-lg bg-primary-600 px-12 py-2.5 text-center text-xl font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
          Generate Playlist
        </button>
        <ul className='mt-12 flex w-full flex-col gap-8 text-gray-50'>
          {songsList.map((el, index) => (
            <li className='flex flex-row items-center gap-6 ' key={el.id}>
              <p className='hidden text-xl text-gray-400 md:block'>
                0{index + 1}
              </p>
              <Image
                className='h-16 w-16 rounded-lg bg-slate-50'
                src={el.image}
                alt='Album cover'
                width={64}
                height={64}
                loader={({ src }) => src}
              />
              <div className='grow'>
                <b className='text-xl'>{el.name}</b>
                <div className='mt-1 flex flex-row items-center gap-1'>
                  <UserSVG />
                  <span className='text-xs text-gray-400'>{el.author}</span>
                </div>
              </div>
              <b className='hidden md:block'>{el.duration}</b>
              <p className='mx-8 hidden md:block'>{el.playsNumber}</p>
              <button className='hidden rounded bg-transparent py-1 px-1 hover:bg-gray-700 md:block'>
                <HeartSVG />
              </button>
              <button className='rounded bg-transparent py-1 px-1 hover:bg-gray-700'>
                <OptionDotsSVG />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </PageWrapper>
  );
}
