import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { PageWrapper } from '@/components/PageWrapper';
import { SongInformation } from '@/components/SongInformation';

import {
  GetSongsResponseAPI,
  GetTokenResponseAPI,
} from '@/services/spotify/types';
import { AddSongResponseAPI } from '@/services/user/types';

import { Song } from '@/types/spotify';

const getFixedIndex = (index: number) => {
  return index < 10 ? `0${index}` : `${index}`;
};

export default function Dashboard() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && status !== 'loading') {
      router.push('/');
    }
    if (!session) return;
    setSongs(session.user?.songs || []);
  }, [session, status, router]);

  const getAccessToken = async () => {
    const cookieAccessToken = Cookies.get('spotify_access_token');
    if (cookieAccessToken) return cookieAccessToken;

    const result = await fetch('/api/spotify/token');
    if (!result.ok) {
      throw Error('Oops. The error has occured, try again later.');
    }
    const data: GetTokenResponseAPI = await result.json();

    const { accessToken, expiresTimeInSeconds } = data;
    const expireDate = new Date(
      new Date().getTime() + expiresTimeInSeconds * 1000
    );

    Cookies.set('spotify_access_token', accessToken, { expires: expireDate });

    return accessToken;
  };

  const handleGeneratePlaylist = async (accessToken: string) => {
    const result = await fetch('/api/spotify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken }),
    });
    const data: GetSongsResponseAPI = await result.json();

    if (data.songs.length === 0) {
      throw new Error('Oops! There is an error with server, try again later!');
    }

    return data.songs;
  };

  const handleAddSongsToAccount = async (songsData: Song[]) => {
    const result = await fetch('/api/auth/songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        songs: songsData,
      }),
    });
    const data: AddSongResponseAPI = await result.json();

    if (data.status === 'error') throw new Error(data.error);
  };

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();
      const songs = await handleGeneratePlaylist(accessToken);
      await handleAddSongsToAccount(songs);

      setSongs(songs);
      toast.success('Data generated successfully');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper title='Dashboard - Spotify Trending Artists App'>
      <div className='mx-auto flex h-screen max-w-3xl flex-col items-center justify-center px-6 py-8 lg:py-0'>
        <button
          onClick={() => signOut()}
          className='mb-8 rounded-lg bg-primary-600 px-12 py-2.5 text-center text-xl font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-300 hover:bg-primary-700 dark:bg-primary-600 dark:focus:ring-primary-800 dark:hover:bg-primary-700'
        >
          Sign out
        </button>
        <button
          onClick={handleClick}
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
