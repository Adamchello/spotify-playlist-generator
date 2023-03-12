import Cookies from 'js-cookie';

import { SongInformation } from '@/components/SongInformation';

import { useMultiStepFormContext } from '../context';

const getFixedIndex = (index: number) => {
  return index < 10 ? `0${index}` : `${index}`;
};

// Returns formatted texts depend on array lenght:
// Length === 1 / John
// Length === 2 / John and Adam
// Length === 3 / John, Adam and Martin
const formatTexts = (texts: string[]) => {
  switch (texts.length) {
    case 1:
      return texts[0];
    case 2:
      return `${texts[0]} and ${texts[1]}`;
    case 3:
      return `${texts[0]}, ${texts[1]} and ${texts[2]}`;
    default:
      return '';
  }
};

export function FifthStep() {
  const { generatedTracks, chosenGenres, chosenArtists } =
    useMultiStepFormContext();

  const handleExport = async () => {
    try {
      const cookieAccessToken = Cookies.get('spotify_access_token');
      const requestParams = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookieAccessToken}`,
        },
      };
      const res1 = await fetch(`https://api.spotify.com/v1/me`, requestParams);
      const data1 = await res1.json();
      const id = data1.id;

      const formattedGenres = formatTexts(
        chosenGenres.map(
          (genre) => genre.charAt(0).toUpperCase() + genre.slice(1)
        )
      );
      const formattedArtists = formatTexts(
        chosenArtists.map((artist) => artist.name)
      );
      const playlistName = `${formattedGenres} with ${formattedArtists}`;

      const res2 = await fetch(
        `https://api.spotify.com/v1/users/${id}/playlists`,
        {
          ...requestParams,
          method: 'POST',
          body: JSON.stringify({
            name: playlistName,
          }),
        }
      );
      const data2 = await res2.json();
      console.log(data2);

      const res3 = await fetch(
        `https://api.spotify.com/v1/playlists/${data2.id}/tracks`,
        {
          ...requestParams,
          method: 'POST',
          body: JSON.stringify({
            uris: generatedTracks.map((value) => `spotify:track:${value.id}`),
          }),
        }
      );
      const data3 = await res3.json();
      console.log(data3);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-center text-2xl font-bold text-gray-50'>
        Your new awesome playlist has been generated!
      </h2>
      {generatedTracks.length > 0 ? (
        <ul className='verflow-y-scroll mt-8 flex h-[400px] w-full flex-col gap-8 pr-6 text-gray-50 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-blue-100'>
          {generatedTracks.map((song, index) => (
            <SongInformation
              key={song.id}
              elementIndex={getFixedIndex(index + 1)}
              {...song}
            />
          ))}
        </ul>
      ) : null}
      <button
        onClick={handleExport}
        className='mt-8 rounded-lg bg-secondary-500 px-12 py-2.5 text-center text-xl font-medium text-white focus:outline-none focus:ring-4 focus:ring-secondary-300 hover:bg-secondary-700 dark:bg-secondary-600 dark:focus:ring-secondary-800 dark:hover:bg-secondary-700'
      >
        Export to Spotify
      </button>
    </div>
  );
}
