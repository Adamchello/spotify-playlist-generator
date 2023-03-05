import { NextApiRequest } from 'next';

import { ResponseAPI } from '../types';

import { Song } from '@/types/spotify';

type User = { email: string; id: string };

export type NextApiRequestWithUser = NextApiRequest & {
  currentUser?: User | null;
};

export type AddSongRequestBody = {
  songs: Song[];
};

export type AddSongResponseAPI = ResponseAPI<{ count: number }>;
