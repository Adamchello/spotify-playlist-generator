import { DefaultUser } from 'next-auth';

import { Song } from '@/types/spotify';

interface UserWithSongs extends DefaultUser {
  songs?: Song[];
}

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface User extends UserWithSongs {}
  interface Session {
    user?: User;
  }
}
