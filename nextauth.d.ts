import { DefaultUser } from 'next-auth';

import { Song } from '@/types/spotify';

interface IUser extends DefaultUser {
  songs?: Song[];
}

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
