import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import prisma from '@/lib/prismadb';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequestWithUser } from '@/services/user/types';

type HandlerArgument = (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => Promise<void>;

export const onlyAuth = (handler: HandlerArgument) => {
  return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({
        status: 'error',
        error: 'Please log in to get access.',
      });
    }

    req.currentUser = await prisma.user.findUnique({
      where: {
        email: session.user?.email || '',
      },
    });

    return handler(req, res);
  };
};
