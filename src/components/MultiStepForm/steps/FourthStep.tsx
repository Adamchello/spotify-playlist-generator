import { useState } from 'react';

import { useMultiStepFormContext } from '../context';

const getNumberBetweenMinMax = (number: number, min: number, max: number) => {
  if (number < min) return min;
  if (number > max) return max;
  return number;
};

export function FourthStep() {
  const [tracksAmount, setTracksAmount] = useState(20);

  const { generatePlaylist, handleSetStep, chosenArtists, chosenGenres } =
    useMultiStepFormContext();

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-center text-2xl font-bold text-gray-50'>Summary</h2>
      <p className='mt-8 text-gray-50'>
        Chosen {chosenArtists.length === 1 ? 'artist' : 'artists'}:
      </p>
      <ul className='list-disc'>
        {chosenArtists.map((artist) => (
          <li className='text-gray-50' key={artist.name}>
            {artist.name}
          </li>
        ))}
      </ul>
      <p className='mt-8 text-gray-50'>
        Chosen {chosenGenres.length === 1 ? 'genre' : 'genres'}:
      </p>
      <ul className='list-disc'>
        {chosenGenres.map((genre) => (
          <li className='text-gray-50' key={genre}>
            {genre}
          </li>
        ))}
      </ul>
      <div className='mt-6'>
        <label htmlFor='tracksAmount' className='mb-2 block text-white'>
          Songs amount
        </label>
        <input
          id='tracksAmount'
          type='number'
          value={tracksAmount}
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          min='20'
          max='100'
          onChange={(e) => setTracksAmount(Number(e.target.value))}
          onBlur={() =>
            setTracksAmount(getNumberBetweenMinMax(tracksAmount, 20, 100))
          }
        />
      </div>

      <button
        onClick={() => handleSetStep('prev')}
        className='mt-12 rounded-lg bg-primary-600 px-12 py-2.5 text-center text-xl font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-300 hover:bg-primary-700 dark:bg-primary-600 dark:focus:ring-primary-800 dark:hover:bg-primary-700'
      >
        Prev
      </button>
      <button
        onClick={() => generatePlaylist(tracksAmount)}
        className='mt-12 rounded-lg bg-primary-600 px-12 py-2.5 text-center text-xl font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-300 hover:bg-primary-700 dark:bg-primary-600 dark:focus:ring-primary-800 dark:hover:bg-primary-700'
      >
        Let's go 🔥
      </button>
    </div>
  );
}
