import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { authorizeUser } from '@/services/auth';

import { AuthFormValues } from '@/types/auth';

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as AuthFormValues;

        const user = await authorizeUser({
          email,
          password,
        });

        if (user) return user;
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
