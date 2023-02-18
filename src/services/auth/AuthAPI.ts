import crypto from 'crypto';
import Joi from 'joi';

import prisma from '@/lib/prismadb';

import { generatePasswordHash } from './utils';

import { AuthFormValues } from '@/types/auth';

const authValuesSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export class AuthAPI {
  static createUser = async (payload: AuthFormValues) => {
    const { email, password } = await authValuesSchema.validateAsync(payload);

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
    const { email, password } = await authValuesSchema.validateAsync(payload);

    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!foundUser) throw new Error('Invalid email or password!');

    const passwordHash = generatePasswordHash(password, foundUser.passwordSalt);

    if (passwordHash !== foundUser.passwordHash)
      throw new Error('Invalid email or password!');

    return {
      id: foundUser.id,
      email: foundUser.email,
    };
  };
}
