import Cookies from 'js-cookie';
import { useState } from 'react';

import { PageWrapper } from '@/components/PageWrapper';
import { SongInformation } from '@/components/SongInformation';

import {
  GetSongsResponseAPI,
  GetTokenResponseAPI,
} from '@/services/spotify/types';

import { Song } from '@/types/spotify';

const getFixedIndex = (index: number) => {
  return index < 10 ? `0${index}` : `${index}`;
};

export default function Dashboard() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAccessToken = async () => {
    const cookieAccessToken = Cookies.get('spotify_access_token');
    if (cookieAccessToken) return cookieAccessToken;

    const result = await fetch('/api/spotify/token');
    const data: GetTokenResponseAPI = await result.json();

    const { accessToken, expiresTimeInSeconds } = data;
    const expireDate = new Date(
      new Date().getTime() + expiresTimeInSeconds * 1000
    );

    Cookies.set('spotify_access_token', accessToken, { expires: expireDate });

    return accessToken;
  };

  const onClick = async () => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();

      const result = await fetch('/api/spotify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
      });
      const data: GetSongsResponseAPI = await result.json();

      setSongs(data.songs);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper title='Dashboard - Spotify Trending Artists App'>
      <div className='mx-auto flex h-screen max-w-3xl flex-col items-center justify-center px-6 py-8 lg:py-0'>
        <button
          onClick={onClick}
          disabled={isLoading}
          className='rounded-lg bg-primary-600 px-12 py-2.5 text-center text-xl font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-300 hover:bg-primary-700 dark:bg-primary-600 dark:focus:ring-primary-800 dark:hover:bg-primary-700'
        >
          {isLoading ? 'Loading...' : 'Generate Playlist'}
        </button>
        {songs.length > 0 ? (
          <ul className='verflow-y-scroll mt-12 flex h-[450px] w-full flex-col gap-8 pr-6 text-gray-50 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-blue-100'>
            {songs.map((song, index) => (
              <SongInformation
                key={song.id}
                elementIndex={getFixedIndex(index + 1)}
                {...song}
              />
            ))}
          </ul>
        ) : null}
      </div>
    </PageWrapper>
  );
}
