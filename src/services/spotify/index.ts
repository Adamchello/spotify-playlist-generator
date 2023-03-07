import { SpotifyAPI } from './SpotifyAPI';

export const getSpotifyToken = async () => {
  const accessTokenData = await SpotifyAPI.getAccessToken();

  return accessTokenData;
};

export const getSongs = async (accessToken: string, genre: string) => {
  const songsCount = await SpotifyAPI.getSongs(accessToken, genre);

  return songsCount;
};
