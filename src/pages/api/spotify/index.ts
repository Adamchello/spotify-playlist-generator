import type { NextApiRequest, NextApiResponse } from 'next';

import { getSongs } from '@/services/spotify';
import { GetSongsResponseAPI } from '@/services/spotify/types';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetSongsResponseAPI>
) => {
  switch (req.method) {
    case 'GET': {
      try {
        const songs = await getSongs();
        res.status(200).json({ songs });
      } catch (error) {
        res.status(400).json({ songs: [] });
      }

      break;
    }
    default:
      res.status(400);
  }
};

export default handler;
