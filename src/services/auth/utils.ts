import crypto from 'crypto';

export const generatePasswordHash = (
  password: string,
  passwordSalt: string
) => {
  return crypto
    .pbkdf2Sync(password, passwordSalt, 1000, 64, 'sha512')
    .toString('hex');
};
