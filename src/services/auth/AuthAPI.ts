import crypto from 'crypto';
import Joi from 'joi';

import prisma from '@/lib/prismadb';

import { AddSongRequestBody } from './types';
import { generatePasswordHash } from './utils';

import { AuthFormValues } from '@/types/auth';

const authValuesSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

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

export class AuthAPI {
  static createUser = async (payload: AuthFormValues) => {
    const { email, password }: AuthFormValues =
      await authValuesSchema.validateAsync(payload);

    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (foundUser) throw new Error('User already exists!');

    const passwordSalt = crypto.randomBytes(16).toString('hex');
    const passwordHash = generatePasswordHash(password, passwordSalt);

    const data = {
      email,
      passwordSalt,
      passwordHash,
      creationDate: new Date(),
    };

    const result = await prisma.user.create({
      data,
    });

    return {
      id: result.id,
      email: result.email,
    };
  };

  static authorizeUser = async (payload: AuthFormValues) => {
    const { email, password }: AuthFormValues =
      await authValuesSchema.validateAsync(payload);

    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!foundUser) throw new Error('Invalid email or password!');

    const passwordHash = generatePasswordHash(password, foundUser.passwordSalt);

    if (passwordHash !== foundUser.passwordHash)
      throw new Error('Invalid email or password!');

    const songs = await prisma.song.findMany({
      where: {
        userId: foundUser.id,
      },
    });

    return {
      id: foundUser.id,
      email: foundUser.email,
      songs: songs.map((song) => {
        // eslint-disable-next-line unused-imports/no-unused-vars
        const { userId, spotifyId, ...rest } = song;
        return { ...rest, id: spotifyId };
      }),
    };
  };

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
