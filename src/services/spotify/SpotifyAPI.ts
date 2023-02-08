import { AccessTokenRequestType, GetSongsRequestType } from './types';
import {
  getAlbumImage,
  getPlaysNumber,
  millisToMinutesAndSeconds,
} from './utils';

export class SpotifyAPI {
  static getAccessToken = async () => {
    const requestParams = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
            'utf8'
          ).toString('base64'),
      },
      body: 'grant_type=client_credentials',
      method: 'POST',
    };

    const res = await fetch(
      'https://accounts.spotify.com/api/token',
      requestParams
    );

    const data: AccessTokenRequestType = await res.json();

    return data.access_token;
  };

  static getSongs = async (accessToken: string) => {
    const requestParams = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await fetch(
      'https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=pop&seed_tracks=0c6xIDDpzE81m2q797ordA',
      requestParams
    );

    const data: GetSongsRequestType = await res.json();

    return data.tracks.map((track) => {
      const duration = millisToMinutesAndSeconds(track.duration_ms);
      const image = getAlbumImage(track);

      // Spotify API doesn't share information about track plays number.
      // For development reasons it is a random number generated by track popularity.
      // Popularity is value between 0 and 100, with 100 being the most popular.
      const playsNumber = getPlaysNumber(track.popularity);
      const mainArist = track.artists[0];

      return {
        id: track.id,
        name: track.name,
        author: mainArist.name,
        image,
        duration,
        playsNumber,
      };
    });
  };
}
