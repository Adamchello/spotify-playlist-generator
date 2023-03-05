import Joi from 'joi';

import prisma from '@/lib/prismadb';

import { AddSongRequestBody } from './types';

const addSongsSchema = Joi.object({
  songs: Joi.array()
    .items(
      Joi.object({
        id: Joi.string(),
        image: Joi.string(),
        name: Joi.string(),
        author: Joi.string(),
        duration: Joi.string(),
        playsNumber: Joi.string(),
      })
    )
    .required(),
});

export class UserAPI {
  static addSongsToUser = async (
    payload: AddSongRequestBody,
    userId: string
  ) => {
    const { songs }: AddSongRequestBody = await addSongsSchema.validateAsync(
      payload
    );

    await prisma.song.deleteMany({
      where: {
        userId,
      },
    });

    const data = songs.map((song) => {
      const { id, ...rest } = song;
      return {
        ...rest,
        spotifyId: id,
        userId,
      };
    });

    const createdSongs = await prisma.song.createMany({ data });

    return createdSongs;
  };
}
