import type { NextApiRequest, NextApiResponse } from 'next';

import { createUser } from '@/services/auth';
import { CreateUserResponseAPI } from '@/services/auth/types';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreateUserResponseAPI>
) => {
  switch (req.method) {
    case 'POST': {
      try {
        const result = await createUser(req.body);
        res.status(201).json({ ok: true, user: result });
      } catch (err) {
        res.status(422).json({
          ok: false,
          error: (err as Error).message,
        });
      }
      break;
    }
    default:
      res.status(400);
  }
};

export default handler;
