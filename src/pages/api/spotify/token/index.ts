import type { NextApiRequest, NextApiResponse } from 'next';

import { getSpotifyToken } from '@/services/spotify';
import { GetTokenResponseAPI } from '@/services/spotify/types';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetTokenResponseAPI>
) => {
  switch (req.method) {
    case 'GET': {
      try {
        const { accessToken, expiresTimeInSeconds } = await getSpotifyToken();
        res.status(200).json({ accessToken, expiresTimeInSeconds });
      } catch (error) {
        res.status(400).json({ accessToken: '', expiresTimeInSeconds: 0 });
      }

      break;
    }
    default:
      res.status(400);
  }
};

export default handler;
