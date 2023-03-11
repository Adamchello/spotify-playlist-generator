import Cookies from 'js-cookie';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useMultiStepFormContext } from '../context';

type Artist = {
  id: string;
  image: string;
  name: string;
};

export function SecondStep() {
  const { chosenArtists, handleToggleArtist, handleSetStep } =
    useMultiStepFormContext();
  const [artists, setArtists] = useState<Artist[]>([]);

  const getArtists = () => {
    const cookieAccessToken = Cookies.get('spotify_access_token');

    fetch('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookieAccessToken}`,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        setArtists(
          res.items.map((item: any) => {
            const image = item.images[item.images.length - 1]?.url || '';

            return {
              id: item.id,
              name: item.name,
              image: image || '',
            };
          })
        );
      });
  };

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <h2 className='mb-6 text-2xl font-bold text-gray-50'>Artists</h2>
      <div className='verflow-y-scroll grid h-[400px] w-full grid-cols-1 gap-6 pr-6 text-gray-50 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-blue-100 sm:grid-cols-2 md:grid-cols-3'>
        {artists.map((artist) => (
          <div key={artist.id}>
            <input
              type='checkbox'
              id={artist.id}
              value=''
              className='peer hidden'
              checked={chosenArtists.some((value) => value.id === artist.id)}
              onChange={() => handleToggleArtist(artist)}
            />
            <label
              htmlFor={artist.id}
              className='inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-500 peer-checked:border-blue-600 peer-checked:text-gray-600 hover:bg-gray-50 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300'
            >
              <div className='flex w-full flex-col items-center justify-center'>
                {artist.image ? (
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    width={64}
                    height={64}
                  />
                ) : (
                  <div className='h-16 w-16 bg-black' />
                )}
                <p className='mt-4 w-full text-center text-lg font-semibold'>
                  {artist.name}
                </p>
              </div>
            </label>
          </div>
        ))}
      </div>
      <button
        disabled={chosenArtists.length > 3 || chosenArtists.length === 0}
        onClick={() => handleSetStep('next')}
        className='mt-12 rounded-lg bg-primary-600 px-12 py-2.5 text-center text-xl font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-300 hover:bg-primary-700 dark:bg-primary-600 dark:focus:ring-primary-800 dark:hover:bg-primary-700'
      >
        ({chosenArtists.length}/3) Next
      </button>
    </div>
  );
}
