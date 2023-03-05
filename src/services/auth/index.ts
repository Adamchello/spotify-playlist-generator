import { AuthAPI } from './AuthAPI';

import { AuthFormValues } from '@/types/auth';

export const createUser = async (payload: AuthFormValues) => {
  const user = await AuthAPI.createUser(payload);

  return user;
};

export const authorizeUser = async (payload: AuthFormValues) => {
  const user = await AuthAPI.authorizeUser(payload);

  return user;
};
