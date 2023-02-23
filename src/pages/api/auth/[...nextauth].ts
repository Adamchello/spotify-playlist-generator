import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { authorizeUser } from '@/services/auth';

import { AuthFormValues } from '@/types/auth';
import { Song } from '@/types/spotify';

export const authOptions: NextAuthOptions = {
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.songs = user.songs;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.songs = token.songs as Song[];
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
