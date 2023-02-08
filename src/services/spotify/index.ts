import { SpotifyAPI } from './SpotifyAPI';

export const getSongs = async () => {
  const accessToken = await SpotifyAPI.getAccessToken();
  const songs = await SpotifyAPI.getSongs(accessToken);

  return songs;
};
