import { AddSongRequestBody } from './types';
import { UserAPI } from './UserAPI';

export const addSongsToUser = async (
  payload: AddSongRequestBody,
  userId: string
) => {
  const songs = await UserAPI.addSongsToUser(payload, userId);

  return songs;
};
