import Image from 'next/image';

import { HeartSVG, OptionDotsSVG, UserSVG } from './Icons';

import { SongType } from '@/types/spotify';

type SongInformationProps = SongType & { elementIndex: string };

export function SongInformation({
  elementIndex,
  id,
  image,
  name,
  author,
  duration,
  playsNumber,
}: SongInformationProps) {
  return (
    <li
      className='grid grid-cols-[64px_1fr_32px] items-center gap-6 md:grid-cols-[28px_64px_1fr_44px_70px_32px_32px]'
      key={id}
    >
      <p className='hidden text-xl text-gray-400 md:block'>{elementIndex}</p>
      <Image
        className='h-16 w-16 rounded-lg bg-slate-50'
        src={image}
        alt='Album cover'
        width={64}
        height={64}
      />
      <div className='grow'>
        <b className='text-xl'>{name}</b>
        <div className='mt-1 flex flex-row items-center gap-1'>
          <UserSVG />
          <span className='text-xs text-gray-400'>{author}</span>
        </div>
      </div>
      <b className='hidden text-center md:block'>{duration}</b>
      <p className='hidden text-center md:block'>{playsNumber}</p>
      <button className='hidden rounded bg-transparent py-1 px-1 hover:bg-gray-700 md:block'>
        <HeartSVG />
      </button>
      <button className='rounded bg-transparent py-1 px-1 hover:bg-gray-700'>
        <OptionDotsSVG />
      </button>
    </li>
  );
}
