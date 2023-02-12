import { Song } from '@/types/spotify';

export type AccessTokenRequest = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type Track = {
  id: string;
  album: {
    images: { height: number; url: string }[];
  };
  artists: { name: string }[];
  duration_ms: number;
  name: string;
  popularity: number;
};

export type GetSongsRequest = {
  seeds: Record<string, string | number>[];
  tracks: Track[];
};

export type GetSongsResponseAPI = {
  songs: Song[];
};

export type GetTokenResponseAPI = {
  accessToken: string;
  expiresTimeInSeconds: number;
};
