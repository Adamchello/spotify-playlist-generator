import { getSpotifyAuthUrl } from './utils';

export function FirstStep() {
  const handleLogin = () => {
    const spotifyAuthUrl = getSpotifyAuthUrl();
    (window as Window).location = spotifyAuthUrl;
  };

  return (
    <div>
      <button
        onClick={handleLogin}
        className='mb-8 rounded-lg bg-secondary-500 px-12 py-2.5 text-center text-xl font-medium text-white focus:outline-none focus:ring-4 focus:ring-secondary-300 hover:bg-secondary-700 dark:bg-secondary-600 dark:focus:ring-secondary-800 dark:hover:bg-secondary-700'
      >
        Connect with Spotify
      </button>
    </div>
  );
}
