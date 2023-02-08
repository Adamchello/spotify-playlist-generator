import { SongType } from '@/types/spotify';

export type AccessTokenRequestType = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type TrackType = {
  id: string;
  album: {
    images: { height: number; url: string }[];
  };
  artists: { name: string }[];
  duration_ms: number;
  name: string;
  popularity: number;
};

export type GetSongsRequestType = {
  seeds: Record<string, string | number>[];
  tracks: TrackType[];
};

export type GetSongsResponseAPI = {
  songs: SongType[];
};
