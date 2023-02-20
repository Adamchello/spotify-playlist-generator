import type { NextApiResponse } from 'next';

import { onlyAuth } from '@/middlewares/onlyAuth';
import { addSongsToUser } from '@/services/auth';
import { AddSongResponseAPI } from '@/services/auth/types';
import { NextApiRequestWithUser } from '@/services/auth/types';

const handler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<AddSongResponseAPI>
) => {
  switch (req.method) {
    case 'POST': {
      try {
        if (!req.currentUser?.id)
          throw new Error('User with this email does not exists.');

        const data = await addSongsToUser(req.body, req.currentUser.id);
        res.status(201).json({ status: 'success', data });
      } catch (err) {
        res.status(422).json({
          status: 'error',
          error: (err as Error).message,
        });
      }
      break;
    }
    default:
      res.status(400);
  }
};

export default onlyAuth(handler);
