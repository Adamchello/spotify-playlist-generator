import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { useMultiStepFormContext } from '../context';

export function ThirdStep() {
  const { chosenGenres, handleToggleGenre, handleSetStep } =
    useMultiStepFormContext();
  const [genres, setGenres] = useState<string[]>([]);

  const getArtists = () => {
    const cookieAccessToken = Cookies.get('spotify_access_token');

    fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookieAccessToken}`,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        setGenres(res.genres);
      });
  };

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <h2 className='mb-6 text-2xl font-bold text-gray-50'>Genres</h2>
      <div className='flex h-[400px] w-[400px] flex-col gap-2 overflow-y-scroll pr-6 text-gray-50 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-blue-100'>
        {genres.map((genre) => (
          <div
            className='flex items-center rounded border border-gray-200 pl-4 dark:border-gray-700'
            key={genre}
          >
            <input
              id={genre}
              type='checkbox'
              value=''
              onChange={() => handleToggleGenre(genre)}
              checked={chosenGenres.includes(genre)}
              name='bordered-checkbox'
              className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
            />
            <label
              htmlFor={genre}
              className='ml-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={() => handleSetStep('prev')}
        className='mt-12 rounded-lg bg-primary-600 px-12 py-2.5 text-center text-xl font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-300 hover:bg-primary-700 dark:bg-primary-600 dark:focus:ring-primary-800 dark:hover:bg-primary-700'
      >
        Prev
      </button>
      <button
        disabled={chosenGenres.length > 2 || chosenGenres.length === 0}
        onClick={() => handleSetStep('next')}
        className='mt-12 rounded-lg bg-primary-600 px-12 py-2.5 text-center text-xl font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-300 hover:bg-primary-700 dark:bg-primary-600 dark:focus:ring-primary-800 dark:hover:bg-primary-700'
      >
        ({chosenGenres.length}/2) Next
      </button>
    </div>
  );
}
